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
var FerozoEmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FerozoEmailService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs-extra");
const path = require("path");
const Imap = require("node-imap");
const stream_1 = require("stream");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
const mailparser_1 = require("mailparser");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let FerozoEmailService = FerozoEmailService_1 = class FerozoEmailService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(FerozoEmailService_1.name);
        this.transporterAscar = nodemailer.createTransport({
            host: this.configService.get("ASCAR_FEROZO_SMTP_HOST"),
            port: Number(this.configService.get("ASCAR_FEROZO_SMTP_PORT")) || 587,
            secure: false,
            auth: {
                user: this.configService.get("ASCAR_FEROZO_SMTP_USER"),
                pass: this.configService.get("ASCAR_FEROZO_SMTP_PASSWORD"),
            },
        });
        this.transporterComara = nodemailer.createTransport({
            host: this.configService.get("COMARA_FEROZO_SMTP_HOST"),
            port: Number(this.configService.get("COMARA_FEROZO_SMTP_PORT")) || 587,
            secure: false,
            auth: {
                user: this.configService.get("COMARA_FEROZO_SMTP_USER"),
                pass: this.configService.get("COMARA_FEROZO_SMTP_PASSWORD"),
            },
        });
    }
    onModuleInit() {
        const fetchEmails = () => {
            this.cotizacionesFetchEmails();
            this.proveedoresFetchEmails();
            const randomInterval = Math.floor(Math.random() * (1200000 - 600000 + 1)) + 600000;
            setTimeout(fetchEmails, randomInterval);
        };
        fetchEmails();
    }
    async handleAttachments(attachments, message_id, folder) {
        const folderPath = path.join("public", "attachments", folder);
        await fs.ensureDir(folderPath);
        for (const attachment of attachments) {
            const filePath = path.join(folderPath, attachment.filename);
            let contentBuffer;
            if (attachment.content instanceof Buffer) {
                contentBuffer = attachment.content;
            }
            else if (typeof attachment.content === 'string') {
                contentBuffer = Buffer.from(attachment.content, 'base64');
            }
            else {
                this.logger.error("El tipo de contenido del archivo no es reconocido.");
                continue;
            }
            try {
                await fs.writeFile(filePath, contentBuffer);
                await this.prisma.purchaseMessageFile.create({
                    data: {
                        file_name: attachment.filename,
                        directory: filePath,
                        message_id,
                    },
                });
                this.logger.log(`Archivo guardado: ${attachment.filename}`);
            }
            catch (err) {
                this.logger.error(`Error guardando el archivo ${attachment.filename}: ${err.message}`);
            }
        }
    }
    async fetchEmailsFromImap(imapConfig, folder) {
        const imap = new Imap(imapConfig);
        imap.once("ready", () => {
            imap.openBox("INBOX", false, async (err, box) => {
                if (err) {
                    this.logger.error("Error al abrir la bandeja de entrada", err);
                    return;
                }
                const today = new Date().toUTCString().split(" ").slice(0, 4).join(" ");
                imap.search([["SINCE", today]], async (err, results) => {
                    if (err) {
                        this.logger.error("Error al buscar correos no leídos", err);
                        return;
                    }
                    if (!results || results.length === 0) {
                        this.logger.log(`No hay correos no leídos en ${folder}`);
                        imap.end();
                        return;
                    }
                    const fetch = imap.fetch(results, { bodies: "", struct: true });
                    fetch.on("message", (msg, seqno) => {
                        msg.on("body", async (stream) => {
                            const nodeStream = stream_1.Readable.from(stream);
                            try {
                                const parsed = await (0, mailparser_1.simpleParser)(nodeStream);
                                const emailMatch = parsed.from?.text?.match(/[\w.-]+@[\w.-]+\.\w+/);
                                const emailAddress = emailMatch ? emailMatch[0] : "Desconocido";
                                let contactName = parsed.from?.text || "Desconocido";
                                contactName = contactName.replace(emailAddress, "").trim().replace(/[<>]/g, "");
                                const emailData = {
                                    from: parsed.from?.text || "Desconocido",
                                    subject: parsed.subject || "Sin Asunto",
                                    date: parsed.date || new Date(),
                                    text: parsed.text || "",
                                    has_file: parsed.attachments.length > 0,
                                    attachments: parsed.attachments,
                                };
                                const existingMessage = await this.prisma.purchaseMessage.findFirst({
                                    where: {
                                        email_address: emailAddress,
                                        received_at: new Date(emailData.date),
                                    },
                                });
                                if (existingMessage) {
                                    this.logger.log(`Correo ya almacenado: ${emailData.subject}`);
                                    return;
                                }
                                const newMessage = await this.prisma.purchaseMessage.create({
                                    data: {
                                        source: "Email",
                                        email_address: emailAddress,
                                        received_at: new Date(emailData.date),
                                        content: emailData.text,
                                        contact_name: contactName,
                                        has_file: emailData.has_file,
                                        expediente_id: null,
                                        forwarded: false,
                                        processed: false,
                                        company_name: (folder.toUpperCase() === 'COMARA') ? 'Comara' : 'Ascar'
                                    },
                                });
                                this.logger.log(`Correo guardado: ${emailData.subject}`);
                                if (emailData.has_file) {
                                    await this.handleAttachments(emailData.attachments, newMessage.message_id, folder);
                                }
                            }
                            catch (error) {
                                this.logger.error("Error al procesar el correo", error);
                            }
                        });
                    });
                    fetch.once("end", () => {
                        this.logger.log(`Finalizada la recuperación de correos en ${folder}.`);
                        imap.end();
                    });
                });
            });
        });
        imap.once("error", (err) => {
            this.logger.error("Error en la conexión IMAP", err);
        });
        imap.once("end", () => {
            this.logger.log("Conexión IMAP cerrada.");
        });
        imap.connect();
    }
    async cotizacionesFetchEmails() {
        const comaraImapConfig = {
            user: process.env.COMARA_FEROZO_IMAP_USER,
            password: process.env.COMARA_FEROZO_IMAP_PASSWORD,
            host: process.env.COMARA_FEROZO_IMAP_HOST,
            port: 993,
            tls: true,
            autotls: "always",
            tlsOptions: { rejectUnauthorized: false },
        };
        await this.fetchEmailsFromImap(comaraImapConfig, "comara");
    }
    async proveedoresFetchEmails() {
        const proveedoresImapConfig = {
            user: process.env.PROVEEDORES_FEROZO_IMAP_USER,
            password: process.env.PROVEEDORES_FEROZO_IMAP_PASSWORD,
            host: process.env.PROVEEDORES_FEROZO_IMAP_HOST,
            port: 993,
            tls: true,
            autotls: "always",
            tlsOptions: { rejectUnauthorized: false },
        };
        await this.fetchEmailsFromImap(proveedoresImapConfig, "proveedores");
    }
    async getStoredEmails() {
        return this.prisma.purchaseMessage.findMany({
            where: {
                hide_message: false,
                source: client_1.MessageSource.Email,
            },
            include: {
                expediente: {
                    select: { expediente_name: true },
                },
                suppliers: {
                    where: { active: true },
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
    async sendEmail(userId, supplierId, messageId, companyName, companyEmail, messageContent, destination) {
        try {
            const mailOptions = {
                from: companyEmail,
                to: destination,
                subject: `Pedido de Cotización de ${companyName}`,
                text: messageContent,
            };
            if (companyEmail === 'proveedores@ascar.com.ar') {
                await this.transporterAscar.sendMail(mailOptions);
            }
            else if (companyEmail === 'cotizaciones@comara.com.ar') {
                await this.transporterComara.sendMail(mailOptions);
            }
            else {
                throw new Error('Email de compañía no válido');
            }
            this.logger.log(`Correo enviado a: ${destination} desde: ${companyEmail}`);
            await this.prisma.quotationHistory.updateMany({
                where: {
                    message_id: messageId,
                    supplier_id: supplierId
                },
                data: { sent_by: userId, sent: true },
            });
        }
        catch (error) {
            this.logger.error("Error enviando correo", error);
            throw new Error("Error al enviar correo");
        }
    }
    async sendGeneralOrderEmail(userId, supplierId, supplierEmail, supplierName, items, companyEmail, companyName) {
        try {
            const header = `Pedido de cotización de ${companyName} \nProveedor: ${supplierName}`;
            const details = items
                .map((item, index) => `Item ${index + 1}:\n- Pedido: ${item.messageContent}\n`)
                .join("\n\n");
            const fullMessage = `${header}\n\n${details}`;
            const mailOptions = {
                from: companyEmail,
                to: supplierEmail,
                subject: `Pedido de Cotizacion de ${companyName}`,
                text: fullMessage,
            };
            if (companyEmail === 'proveedores@ascar.com.ar') {
                await this.transporterAscar.sendMail(mailOptions);
            }
            else if (companyEmail === 'cotizaciones@comara.com.ar') {
                await this.transporterComara.sendMail(mailOptions);
            }
            else {
                throw new Error('Email de compañía no válido');
            }
            this.logger.log(`Correo enviado a: ${supplierEmail} desde: ${companyEmail}`);
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
                            user_id: Number(userId),
                            message_content: item.messageContent,
                            sent: true,
                        },
                    });
                    this.logger.log(`Registro actualizado en QuotationHistory para message_id: ${item.messageId}, supplier_id: ${supplierId}`);
                }
            }
            this.logger.log(`Pedido general enviado por correo y registrado para ${supplierName} (${supplierEmail})`);
        }
        catch (error) {
            this.logger.error(`Error al enviar pedido general por correo: ${error.message}`);
            throw new Error(`Error al enviar pedido general por correo: ${error.message}`);
        }
    }
};
exports.FerozoEmailService = FerozoEmailService;
exports.FerozoEmailService = FerozoEmailService = FerozoEmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], FerozoEmailService);
//# sourceMappingURL=email.ferozo.service.js.map