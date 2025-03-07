"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const prisma_service_1 = require("../prisma/prisma.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const client_1 = require("@prisma/client");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
        this.logger = new common_1.Logger(WhatsappService_1.name);
        this.clientInfo = null;
        this.messageStatusMap = new Map();
        this.clientStatus$ = new rxjs_1.BehaviorSubject("initializing");
        this.qrCodeSubject$ = new rxjs_1.BehaviorSubject(null);
        this.authenticatedPhoneNumber = null;
        this.currentUserId = null;
        this.botEnabled = true;
        this.IAEnabled = false;
        const os = require("os");
        const isLinux = os.platform() === "linux";
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.NoAuth(),
            puppeteer: isLinux
                ? {
                    headless: false,
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                }
                : undefined,
        });
        this.client.initialize();
    }
    initializeClient() {
        const os = require("os");
        const isLinux = os.platform() === "linux";
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.NoAuth(),
            puppeteer: isLinux
                ? {
                    headless: false,
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                }
                : undefined,
        });
        this.client.on("qr", (qr) => {
            this.clientStatus$.next("qr");
            this.qrCodeSubject$.next(qr);
        });
        this.client.on("ready", async () => {
            this.clientStatus$.next("ready");
            this.clientInfo = this.client.info;
            if (this.clientInfo) {
                this.authenticatedPhoneNumber = this.clientInfo.wid.user;
            }
        });
        this.client.on("authenticated", async () => {
            this.clientStatus$.next("authenticated");
            if (this.client.info) {
                this.authenticatedPhoneNumber = this.client.info.wid.user;
            }
        });
        this.client.on("disconnected", async (reason) => {
            this.clientStatus$.next("disconnected");
        });
        this.client.on("message", async (message) => {
            try {
                const { from, body, hasMedia } = message;
                if (from.endsWith("@g.us"))
                    return;
                const isPurchaseOrder = this.IAEnabled
                    ? await this.checkIfPurchaseOrder(body)
                    : true;
                if (isPurchaseOrder) {
                    const receivedAt = new Date(new Date().setHours(new Date().getHours() - 3));
                    const contact = await message.getContact();
                    const contactName = contact.pushname || contact.verifiedName;
                    const source = "WhatsApp";
                    let fileName = null;
                    let additionalMessage = body;
                    let hasFile = false;
                    if (hasMedia) {
                        const media = await message.downloadMedia();
                        if (media) {
                            if (media.mimetype === "application/pdf") {
                                const match = body.match(/[\w,\s-]+\.[A-Za-z]{3}$/);
                                if (match) {
                                    fileName = match[0];
                                }
                                else {
                                    const nextId = await this.nextID();
                                    fileName = `${nextId}.pdf`;
                                }
                                const filePath = `./src/whatsapp/downloads/${fileName}`;
                                const fs = require("fs");
                                fs.writeFileSync(filePath, media.data, { encoding: "base64" });
                                this.logger.log(`Archivo PDF guardado: ${filePath}`);
                                hasFile = true;
                            }
                        }
                    }
                    await this.prisma.purchaseMessage.create({
                        data: {
                            phone_number: from.replace("@c.us", ""),
                            received_at: receivedAt,
                            content: additionalMessage,
                            contact_name: contactName,
                            source: source,
                            forwarded: false,
                            has_file: hasFile,
                        },
                    });
                    this.logger.log(`Mensaje de ${from} guardado en la base de datos.`);
                }
            }
            catch (error) {
                console.error("Error procesando el mensaje:", error);
            }
        });
        this.client.initialize();
    }
    clearAuthAndCacheFolders() {
        const fs = require("fs");
        const path = require("path");
        const authFolderPath = path.join(__dirname, "..", "..", ".wwebjs_auth");
        const cacheFolderPath = path.join(__dirname, "..", "..", ".wwebjs_cache");
        try {
            fs.rmSync(authFolderPath, { recursive: true, force: true });
            fs.rmSync(cacheFolderPath, { recursive: true, force: true });
            this.logger.log("Authentication and cache folders cleared.");
        }
        catch (error) {
            this.logger.error("Error clearing auth and cache folders:", error);
        }
    }
    async nextID() {
        return ((await this.prisma.purchaseMessage.aggregate({
            _max: { message_id: true },
        }))._max.message_id + 1 || 1);
    }
    async checkIfPurchaseOrder(message) {
        try {
            const response = await this.httpService
                .post("http://localhost:6000/predict", { text: message })
                .toPromise();
            return response.data.classification;
        }
        catch (error) {
            console.error("Error al consultar el endpoint /predict:", error);
            return false;
        }
    }
    async sendMessage(messageId, to, message, expediente, options, supplierId, userId) {
        if (!this.clientInfo?.wid) {
            throw new Error("Client is not initialized or connected.");
        }
        try {
            const fullMessage = options && options.length > 0 ? `${message} ${options}` : message;
            const sentMessage = await this.client.sendMessage(to, fullMessage);
            await this.prisma.purchaseMessage.update({
                where: { message_id: messageId },
                data: {
                    expediente_id: expediente ? expediente : 1,
                },
            });
            console.log("supplierId", supplierId);
            if (supplierId) {
                const existingRecord = await this.prisma.quotationHistory.findFirst({
                    where: {
                        message_id: messageId,
                        supplier_id: supplierId,
                        sent: false,
                    },
                });
                if (existingRecord) {
                    await this.prisma.quotationHistory.update({
                        where: { quotation_id: existingRecord.quotation_id },
                        data: {
                            message_content: fullMessage,
                            sent: true,
                            user_id: 1,
                        },
                    });
                    this.logger.log(`Registro actualizado en QuotationHistory para message_id: ${messageId}, supplier_id: ${supplierId}`);
                }
                else {
                    await this.prisma.quotationHistory.create({
                        data: {
                            message_id: messageId,
                            supplier_id: supplierId,
                            user_id: userId || 1,
                            company_name: client_1.Companies.Ascar,
                            message_content: fullMessage,
                            sent: true,
                        },
                    });
                    this.logger.log(`Nuevo registro creado en QuotationHistory para message_id: ${messageId}, supplier_id: ${supplierId}`);
                }
            }
            this.messageStatusMap.set(sentMessage.id.id, {
                resolve: (status) => Promise.resolve(status),
                reject: (error) => Promise.reject(error),
            });
            return 1;
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async getAllMessages() {
        try {
            return await this.prisma.purchaseMessage.findMany({
                where: {
                    hide_message: false,
                    source: client_1.MessageSource.WhatsApp,
                },
                include: {
                    expediente: {
                        select: {
                            expediente_name: true,
                        },
                    },
                    suppliers: {
                        where: {
                            active: true,
                        },
                        select: {
                            supplier_id: true,
                            name: true,
                            phone_number: true,
                            email_address: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            this.logger.error(`Error retrieving messages: ${error.message}`);
            throw error;
        }
    }
    async hideMessage(messageId) {
        return await this.prisma.purchaseMessage.update({
            where: { message_id: messageId },
            data: { hide_message: true },
        });
    }
    setCurrentUserId(userId) {
        this.currentUserId = userId;
    }
    getQRCode() {
        return this.qrCodeSubject$.asObservable().pipe((0, operators_1.filter)((qr) => qr !== null));
    }
    getClientStatus() {
        return this.clientStatus$.asObservable();
    }
    getAuthenticatedPhoneNumber() {
        return this.clientInfo ? (0, rxjs_1.of)(this.clientInfo.wid.user) : (0, rxjs_1.of)(null);
    }
    setIAEnabled(enabled) {
        this.IAEnabled = enabled;
        this.logger.log(`IA status changed: ${enabled ? "Enabled" : "Disabled"}`);
    }
    async resendMessage(messageId, originalContact, to, message, originalSender, expediente, companyName) {
        try {
            const fullMessage = `Razon social: ${companyName} - Expediente: ${expediente} - Mensaje original de ${originalContact} - (${originalSender}): ${message}`;
            await this.sendMessage(messageId, to + "@c.us", fullMessage, expediente);
            this.logger.log(`Mensaje reenviado a ${to} desde ${originalSender}`);
            let companyEnum;
            switch (companyName) {
                case "Ascar":
                    companyEnum = client_1.Companies.Ascar;
                    break;
                case "Comara":
                    companyEnum = client_1.Companies.Comara;
                    break;
                default:
                    companyEnum = client_1.Companies.Ascar;
            }
            await this.prisma.purchaseMessage.update({
                where: { message_id: messageId },
                data: {
                    forwarded: true,
                    expediente: {
                        connect: { expediente_id: expediente ? expediente : 1 },
                    },
                    company_name: companyEnum,
                },
            });
            this.logger.log(`Campo 'forwarded' actualizado a true para el mensaje con ID ${messageId}`);
        }
        catch (error) {
            this.logger.error(`Error reenviando mensaje a ${to}: ${error.message}`);
            throw new Error(`Error reenviando mensaje: ${error.message}`);
        }
    }
    async assignSupplierToMessage(messageId, suppliersId, companyName, userId, companyEmail) {
        let companyEnum;
        switch (companyName) {
            case "Ascar":
                companyEnum = client_1.Companies.Ascar;
                break;
            case "Comara":
                companyEnum = client_1.Companies.Comara;
                break;
            default:
                companyEnum = client_1.Companies.Ascar;
        }
        const purchaseMessage = await this.prisma.purchaseMessage.update({
            where: { message_id: Number(messageId) },
            data: {
                company_name: companyEnum,
                suppliers: {
                    set: suppliersId.map((id) => ({ supplier_id: Number(id) })),
                },
            },
            include: {
                suppliers: true,
            },
        });
        for (const supplierId of suppliersId) {
            const supplier = await this.prisma.supplier.findUnique({
                where: { supplier_id: Number(supplierId) },
            });
            if (!supplier) {
                throw new common_1.NotFoundException(`Proveedor con ID ${supplierId} no encontrado`);
            }
            const existingRecord = await this.prisma.quotationHistory.findFirst({
                where: {
                    message_id: Number(messageId),
                    supplier_id: Number(supplierId),
                    company_email: companyEmail,
                },
            });
            if (!existingRecord) {
                await this.prisma.quotationHistory.create({
                    data: {
                        message_id: Number(messageId),
                        supplier_id: Number(supplierId),
                        user_id: userId,
                        company_name: companyEnum,
                        company_email: companyEmail,
                        message_content: purchaseMessage.content,
                        sent: false,
                        sent_at: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                    },
                });
            }
            await this.prisma.userAudit.create({
                data: {
                    user_id: userId,
                    action: "ASSIGN_SUPPLIER",
                    details: `Proveedor ID ${supplierId} asignado al mensaje ID ${messageId}`,
                    ip_address: null,
                },
            });
        }
        return purchaseMessage;
    }
    async unassignSupplierFromMessage(messageId, supplierId, userId) {
        const purchaseMessage = await this.prisma.purchaseMessage.findUnique({
            where: { message_id: Number(messageId) },
            include: { suppliers: true },
        });
        if (!purchaseMessage) {
            throw new common_1.NotFoundException(`Mensaje con ID ${messageId} no encontrado.`);
        }
        const supplierExists = purchaseMessage.suppliers.some((supplier) => supplier.supplier_id === Number(supplierId));
        if (!supplierExists) {
            throw new common_1.NotFoundException(`El proveedor con ID ${supplierId} no está asignado a este mensaje.`);
        }
        const updatedMessage = await this.prisma.purchaseMessage.update({
            where: { message_id: Number(messageId) },
            data: {
                suppliers: {
                    disconnect: { supplier_id: Number(supplierId) },
                },
            },
            include: { suppliers: true },
        });
        await this.prisma.quotationHistory.deleteMany({
            where: {
                message_id: Number(messageId),
                supplier_id: Number(supplierId),
            },
        });
        await this.prisma.userAudit.create({
            data: {
                user_id: userId,
                action: "UNASSIGN_SUPPLIER",
                details: `Proveedor ID ${supplierId} desasignado del mensaje ID ${messageId}`,
                ip_address: null,
            },
        });
        this.logger.log(`Proveedor ID ${supplierId} desasignado del mensaje ID ${messageId}`);
        return updatedMessage;
    }
    async sendGeneralOrder(userId, supplierId, supplierPhone, supplierName, items) {
        try {
            const header = `Pedido General\nProveedor: ${supplierName}`;
            const details = items
                .map((item, index) => `Item ${index + 1}:\n- Pedido: ${item.messageContent}\n`)
                .join("\n\n");
            const fullMessage = `${header}\n\n${details}`;
            await this.sendMessageToSupplier(supplierPhone, fullMessage);
            for (const item of items) {
                const existingRecord = await this.prisma.quotationHistory.findFirst({
                    where: {
                        message_id: item.messageId,
                        supplier_id: supplierId,
                        sent: false,
                    },
                });
                if (existingRecord) {
                    await this.prisma.quotationHistory.update({
                        where: { quotation_id: existingRecord.quotation_id },
                        data: {
                            user_id: userId,
                            message_content: item.messageContent,
                            sent: true,
                        },
                    });
                    this.logger.log(`Registro actualizado en QuotationHistory para message_id: ${item.messageId}, supplier_id: ${supplierId}`);
                }
            }
            this.logger.log(`Pedido general enviado y registrado para ${supplierName} (${supplierPhone})`);
        }
        catch (error) {
            this.logger.error(`Error al enviar pedido general: ${error.message}`);
            throw new Error(`Error al enviar pedido general: ${error.message}`);
        }
    }
    async sendMessageToSupplier(supplierPhone, message) {
        try {
            const sentMessage = await this.client.sendMessage(supplierPhone + "@c.us", message);
            this.messageStatusMap.set(sentMessage.id.id, {
                resolve: (status) => Promise.resolve(status),
                reject: (error) => Promise.reject(error),
            });
        }
        catch (error) {
            console.error(`Error sending message to supplier: ${error.message}`);
            throw new Error(`Error sending message to supplier: ${error.message}`);
        }
    }
    async restartClient() {
        try {
            this.logger.log("Restarting WhatsApp client...");
            if (this.client) {
                this.logger.log("WhatsApp client destroyed...");
                await this.client.destroy();
            }
            this.clearAuthAndCacheFolders();
            this.initializeClient();
            this.logger.log("WhatsApp client restarted successfully.");
        }
        catch (error) {
            this.logger.error("Error restarting WhatsApp client:", error);
            throw new Error("Failed to restart WhatsApp client.");
        }
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map