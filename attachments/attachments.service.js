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
var AttachmentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AttachmentsService = AttachmentsService_1 = class AttachmentsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AttachmentsService_1.name);
    }
    async getAllAttachments() {
        try {
            const attachments = await this.prisma.purchaseMessageFile.findMany({
                include: {
                    purchase_message: true,
                },
            });
            this.logger.log(`Se han recuperado ${attachments.length} archivos adjuntos`);
            return attachments;
        }
        catch (error) {
            this.logger.error('Error al recuperar archivos adjuntos', error);
            throw error;
        }
    }
    async getAttachmentById(id) {
        try {
            const attachment = await this.prisma.purchaseMessageFile.findUnique({
                where: { file_id: id },
            });
            if (!attachment) {
                this.logger.warn(`Archivo adjunto con ID ${id} no encontrado`);
                return null;
            }
            this.logger.log(`Archivo adjunto con ID ${id} recuperado`);
            return attachment;
        }
        catch (error) {
            this.logger.error('Error al recuperar archivo adjunto por ID', error);
            throw error;
        }
    }
    async getAttachmentsByMessageId(messageId) {
        const attachments = await this.prisma.purchaseMessageFile.findMany({
            where: {
                message_id: messageId,
            },
        });
        return attachments;
    }
};
exports.AttachmentsService = AttachmentsService;
exports.AttachmentsService = AttachmentsService = AttachmentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttachmentsService);
//# sourceMappingURL=attachments.service.js.map