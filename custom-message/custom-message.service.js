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
var CustomMessageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CustomMessageService = CustomMessageService_1 = class CustomMessageService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CustomMessageService_1.name);
    }
    async getAllCustomMessages() {
        try {
            return await this.prisma.purchaseMessage.findMany({
                where: {
                    source: client_1.MessageSource.Custom,
                    hide_message: false
                },
                include: {
                    expediente: { select: { expediente_name: true } },
                    suppliers: { select: { supplier_id: true, name: true } },
                },
            });
        }
        catch (error) {
            this.logger.error(`Error fetching custom messages: ${error.message}`);
            throw error;
        }
    }
    async getCustomMessageById(id) {
        try {
            return await this.prisma.purchaseMessage.findUnique({
                where: { message_id: id },
                include: {
                    expediente: { select: { expediente_name: true } },
                    suppliers: { select: { supplier_id: true, name: true } },
                },
            });
        }
        catch (error) {
            this.logger.error(`Error fetching custom message: ${error.message}`);
            throw error;
        }
    }
    async createCustomMessage(content, contactName, destination, companyName, expedienteId) {
        try {
            const company = companyName === "Ascar" ? client_1.Companies.Ascar : client_1.Companies.Comara;
            const newMessage = await this.prisma.purchaseMessage.create({
                data: {
                    content,
                    contact_name: contactName,
                    phone_number: destination.includes('@') ? null : destination,
                    email_address: destination.includes('@') ? destination : null,
                    company_name: company,
                    source: client_1.MessageSource.Custom,
                    expediente: {
                        connect: { expediente_id: expedienteId ? expedienteId : 1 },
                    },
                    received_at: new Date(),
                },
            });
            return newMessage;
        }
        catch (error) {
            this.logger.error(`Error creating custom message: ${error.message}`);
            throw error;
        }
    }
    async sendCustomMessage(id) {
        try {
            const message = await this.prisma.purchaseMessage.findUnique({
                where: { message_id: id },
            });
            if (!message) {
                throw new Error(`Custom message with ID ${id} not found`);
            }
            this.logger.log(`Sending custom message to ${message.phone_number || "unknown"}: ${message.content}`);
            return "Custom message sent successfully";
        }
        catch (error) {
            this.logger.error(`Error sending custom message: ${error.message}`);
            throw error;
        }
    }
};
exports.CustomMessageService = CustomMessageService;
exports.CustomMessageService = CustomMessageService = CustomMessageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomMessageService);
//# sourceMappingURL=custom-message.service.js.map