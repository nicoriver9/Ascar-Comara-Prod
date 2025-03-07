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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuotationHistoryService = class QuotationHistoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        return await this.prisma.quotationHistory.findMany({
            select: {
                quotation_id: true,
                message_id: true,
                supplier_id: true,
                user_id: true,
                company_name: true,
                message_content: true,
                company_email: true,
                sent: true,
                sent_at: true,
                created_at: true,
                updated_at: true,
                supplier: { select: { supplier_id: true, name: true, email_address: true, phone_number: true } },
                purchaseMessage: { select: { message_id: true, contact_name: true } },
                user: {
                    select: {
                        user_id: true,
                        username: true,
                    },
                },
            },
        });
    }
    async getSent() {
        return await this.prisma.quotationHistory.findMany({
            where: {
                sent: true,
            },
            include: {
                supplier: true,
                purchaseMessage: true,
                user: {
                    select: {
                        user_id: true,
                        username: true,
                    },
                },
            },
        });
    }
    async getById(id) {
        return await this.prisma.quotationHistory.findMany({
            where: {
                message_id: id,
            },
            select: {
                quotation_id: true,
                message_id: true,
                supplier_id: true,
                user_id: true,
                company_name: true,
                message_content: true,
                company_email: true,
                sent: true,
                sent_at: true,
                created_at: true,
                updated_at: true,
                supplier: { select: { supplier_id: true, name: true, email_address: true, phone_number: true } },
                purchaseMessage: { select: { message_id: true, contact_name: true } },
                user: {
                    select: {
                        user_id: true,
                        username: true,
                    },
                },
            },
        });
    }
    async create(data) {
        return await this.prisma.quotationHistory.create({
            data,
        });
    }
    async update(messageId, supplierId, messageContent) {
        const existingRecords = await this.prisma.quotationHistory.findMany({
            where: {
                message_id: messageId,
                supplier_id: supplierId,
                sent: false,
            },
        });
        if (existingRecords.length === 0) {
            throw new common_1.NotFoundException(`No se encontró el registro con messageId ${messageId} y supplierId ${supplierId} para actualizar.`);
        }
        const existingRecord = existingRecords[0];
        return await this.prisma.quotationHistory.update({
            where: {
                quotation_id: existingRecord.quotation_id,
            },
            data: {
                message_content: messageContent,
            },
        });
    }
    async delete(id) {
        const existingRecord = await this.prisma.quotationHistory.findUnique({
            where: { quotation_id: id },
        });
        if (!existingRecord) {
            throw new common_1.NotFoundException(`No se encontró el registro con ID ${id} para eliminar.`);
        }
        return await this.prisma.quotationHistory.delete({
            where: { quotation_id: id },
        });
    }
    async getUnsentQuotations() {
        return await this.prisma.quotationHistory.findMany({
            where: {
                sent: false,
            },
            include: {
                supplier: true,
                purchaseMessage: true,
                user: {
                    select: {
                        user_id: true,
                        username: true,
                    },
                },
            },
        });
    }
};
exports.QuotationHistoryService = QuotationHistoryService;
exports.QuotationHistoryService = QuotationHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuotationHistoryService);
//# sourceMappingURL=quotation-history.service.js.map