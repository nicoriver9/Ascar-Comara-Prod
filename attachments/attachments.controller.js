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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsController = void 0;
const common_1 = require("@nestjs/common");
const attachments_service_1 = require("./attachments.service");
const path = require("path");
const fs = require("fs");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
let AttachmentsController = class AttachmentsController {
    constructor(attachmentsService) {
        this.attachmentsService = attachmentsService;
    }
    async getAllAttachments() {
        return this.attachmentsService.getAllAttachments();
    }
    async getAttachmentById(id) {
        const attachment = await this.attachmentsService.getAttachmentById(id);
        if (!attachment) {
            throw new common_1.NotFoundException(`Archivo adjunto con ID ${id} no encontrado`);
        }
        return attachment;
    }
    async getAttachmentsByMessageId(messageId) {
        const attachments = await this.attachmentsService.getAttachmentsByMessageId(Number(messageId));
        if (!attachments || attachments.length === 0) {
            throw new common_1.NotFoundException('No se encontraron archivos adjuntos para este mensaje');
        }
        return attachments;
    }
    async downloadFile(fileCategory, fileName, res) {
        const filePath = path.join(__dirname, '..', '..', 'public', 'attachments', fileCategory, fileName);
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.sendFile(filePath);
        }
        else {
            res.status(common_1.HttpStatus.NOT_FOUND).send('Archivo no encontrado');
        }
    }
    async downloadFileComara(fileName, res) {
        return this.downloadFile('comara', fileName, res);
    }
    async downloadFileProveedores(fileName, res) {
        return this.downloadFile('proveedores', fileName, res);
    }
};
exports.AttachmentsController = AttachmentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "getAllAttachments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "getAttachmentById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('message/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "getAttachmentsByMessageId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('comara/:fileName'),
    __param(0, (0, common_1.Param)('fileName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "downloadFileComara", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('proveedores/:fileName'),
    __param(0, (0, common_1.Param)('fileName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "downloadFileProveedores", null);
exports.AttachmentsController = AttachmentsController = __decorate([
    (0, common_1.Controller)('api/attachments'),
    __metadata("design:paramtypes", [attachments_service_1.AttachmentsService])
], AttachmentsController);
//# sourceMappingURL=attachments.controller.js.map