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
var GmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailService = void 0;
const common_1 = require("@nestjs/common");
const Imap = require("imap");
const nodemailer = require("nodemailer");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const dotenv = require("dotenv");
const client_2 = require("@prisma/client");
dotenv.config();
let GmailService = GmailService_1 = class GmailService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(GmailService_1.name);
        this.imap = new Imap({
            user: process.env.GMAIL_USER,
            password: process.env.GMAIL_PASSWORD,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
        });
    }
    onModuleInit() {
        const intervalMinutes = parseInt(process.env.MONITOR_INTERVAL_MINUTES || "5", 10);
        const intervalMilliseconds = intervalMinutes * 60 * 1000;
        this.logger.log(`Iniciando monitoreo de correos cada ${intervalMinutes} minutos.`);
        this.monitorInterval = setInterval(() => {
            this.fetchEmailsPeriodically();
        }, intervalMilliseconds);
    }
    onModuleDestroy() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
    }
    fetchEmailsPeriodically() {
        this.imap.once("ready", () => {
            this.fetchNewEmails();
        });
        this.imap.once("error", (err) => this.logger.error("IMAP error:", err));
        this.imap.connect();
    }
    async fetchEmailsOnDemand() {
        return new Promise((resolve, reject) => {
            this.imap.once("ready", () => {
                this.fetchNewEmails(resolve, reject);
            });
            this.imap.once("error", (err) => {
                this.logger.error("IMAP error:", err.message);
                reject(err);
            });
            this.imap.connect();
        });
    }
    fetchNewEmails(resolve, reject) {
        this.imap.openBox("INBOX", true, (err, box) => {
            if (err) {
                this.logger.error("Error opening inbox:", err.message);
                if (reject)
                    reject(err);
                return;
            }
            const sequenceNumber = box.messages.total;
            const f = this.imap.seq.fetch(sequenceNumber + ":*", {
                bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)", "TEXT"],
            });
            f.on("message", async (msg, seqno) => {
                let emailContent = "";
                let emailHeader;
                msg.on("body", (stream, info) => {
                    let buffer = "";
                    stream.on("data", (chunk) => (buffer += chunk.toString("utf8")));
                    stream.once("end", () => {
                        if (info.which !== "TEXT") {
                            emailHeader = Imap.parseHeader(buffer);
                        }
                        else {
                            emailContent = buffer;
                        }
                    });
                });
                msg.once("end", async () => {
                    const receivedAt = emailHeader.date[0];
                    const contactName = emailHeader.from[0];
                    const emailAddress = emailHeader.to[0];
                    const content = emailContent;
                    const existingMessage = await this.prisma.purchaseMessage.findFirst({
                        where: { content, received_at: receivedAt },
                    });
                    if (!existingMessage) {
                        await this.prisma.purchaseMessage.create({
                            data: {
                                phone_number: null,
                                email_address: emailAddress,
                                received_at: receivedAt,
                                content,
                                contact_name: contactName,
                                source: client_1.MessageSource.Email,
                                forwarded: false,
                                expediente: null,
                                company_name: null
                            },
                        });
                        this.logger.log(`Nuevo email almacenado de ${contactName}`);
                    }
                    else {
                        this.logger.log("Email duplicado no almacenado");
                    }
                });
            });
            f.once("error", (err) => this.logger.error("Fetch error:", err.message));
            f.once("end", () => {
                this.logger.log("Terminó de procesar los correos");
                this.imap.end();
                if (resolve)
                    resolve();
            });
        });
    }
    async simulateEmails() {
        const simulatedEmails = [
            {
                email_address: "client1@example.com",
                received_at: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                content: "Solicitud de cotización para 50 unidades de Producto A",
                contact_name: "Cliente 1",
                source: client_1.MessageSource.Email,
                forwarded: false,
                company_name: client_2.Companies.Ascar
            },
            {
                email_address: "client2@example.com",
                received_at: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                content: "Pedido de compra para 100 unidades de Producto B",
                contact_name: "Cliente 2",
                source: client_1.MessageSource.Email,
                forwarded: false,
                company_name: client_2.Companies.Ascar
            },
            {
                email_address: "client3@example.com",
                received_at: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                content: "Consulta sobre disponibilidad de Producto C",
                contact_name: "Cliente 3",
                source: client_1.MessageSource.Email,
                forwarded: false,
                company_name: client_2.Companies.Ascar
            },
            {
                email_address: "client4@example.com",
                received_at: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                content: "Solicitud de cotización para 30 unidades de Producto D",
                contact_name: "Cliente 4",
                source: client_1.MessageSource.Email,
                forwarded: false,
                company_name: client_2.Companies.Ascar
            },
            {
                email_address: "client5@example.com",
                received_at: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                content: "Pedido de compra para 25 unidades de Producto E",
                contact_name: "Cliente 5",
                source: client_1.MessageSource.Email,
                forwarded: false,
                company_name: client_2.Companies.Ascar
            },
        ];
        for (const email of simulatedEmails) {
            await this.prisma.purchaseMessage.create({
                data: email,
            });
        }
        this.logger.log("Correos simulados insertados en la base de datos.");
    }
    async getAllMessages() {
        try {
            const emails = await this.prisma.purchaseMessage.findMany({
                where: {
                    hide_message: false,
                    forwarded: false,
                    source: client_1.MessageSource.Email,
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
            const emailsWithSupplier = emails.map((email) => ({
                ...email,
                supplier_name: email.suppliers ? email.suppliers.map(supplier => supplier.name).join(', ') : null,
            }));
            return emailsWithSupplier;
        }
        catch (error) {
            this.logger.error("Error al obtener correos electrónicos de la base de datos.", error);
            throw new common_1.HttpException("Failed to retrieve emails from the database.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendEmail(userId, supplierId, messageId, destination, subject, fullMessage, expediente, companyName) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: destination,
            subject,
            text: fullMessage,
        };
        try {
            await transporter.sendMail(mailOptions);
            await this.prisma.purchaseMessage.update({
                where: { message_id: messageId },
                data: {
                    expediente: {
                        connect: { expediente_id: expediente ? expediente : 1 },
                    },
                },
            });
            console.log('supplierId', supplierId);
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
                            user_id: userId || 1
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
                            company_name: client_2.Companies.Ascar,
                            message_content: fullMessage,
                            sent: true,
                        },
                    });
                    this.logger.log(`Nuevo registro creado en QuotationHistory para message_id: ${messageId}, supplier_id: ${supplierId}`);
                }
            }
            return 1;
            this.logger.log(`Correo enviado a ${destination} con asunto: ${subject}`);
        }
        catch (error) {
            this.logger.error(`Error enviando correo a ${destination}:`, error.message);
            throw error;
        }
    }
};
exports.GmailService = GmailService;
exports.GmailService = GmailService = GmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GmailService);
//# sourceMappingURL=gmail.service.js.map