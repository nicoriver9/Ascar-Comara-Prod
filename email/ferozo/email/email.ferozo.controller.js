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
var FerozoEmailController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FerozoEmailController = void 0;
const common_1 = require("@nestjs/common");
const email_ferozo_service_1 = require("./email.ferozo.service");
const jwt_auth_guard_1 = require("../../../jwt-auth/jwt-auth.guard");
let FerozoEmailController = FerozoEmailController_1 = class FerozoEmailController {
    constructor(ferozoEmailService) {
        this.ferozoEmailService = ferozoEmailService;
        this.logger = new common_1.Logger(FerozoEmailController_1.name);
    }
    async getStoredEmails() {
        try {
            return await this.ferozoEmailService.getStoredEmails();
        }
        catch (error) {
            this.logger.error("❌ Error obteniendo emails:", error.message);
            throw new common_1.HttpException("Failed to retrieve emails.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getComaraInboxEmails() {
        try {
            const comaraEmails = await this.ferozoEmailService.cotizacionesFetchEmails();
            return { success: true, comaraEmails };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async getProveedoresInboxEmails() {
        try {
            const proveedoresEmails = await this.ferozoEmailService.proveedoresFetchEmails();
            return { success: true, proveedoresEmails };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async sendQuotationEmail(userId, supplierId, messageId, companyName, companyEmail, messageContent, destination) {
        await this.ferozoEmailService.sendEmail(userId, supplierId, messageId, companyName, companyEmail, messageContent, destination);
        return { success: true, message: "Correo enviado correctamente." };
    }
    async sendSupplierEmail(userId, supplierId, messageId, companyName, companyEmail, messageContent, destination) {
        await this.ferozoEmailService.sendEmail(userId, supplierId, messageId, companyName, companyEmail, messageContent, destination);
        return { success: true, message: "Correo enviado correctamente." };
    }
    async sendGeneralOrdersEmail(body) {
        try {
            const { userId, supplierId, supplierName, supplierEmail, items, companyEmail, companyName } = body;
            await this.ferozoEmailService.sendGeneralOrderEmail(userId, supplierId, supplierEmail, supplierName, items, companyEmail, companyName);
            return {
                message: `Pedido general enviado exitosamente a ${supplierName} por correo electrónico.`,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Error al enviar el pedido general por correo: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FerozoEmailController = FerozoEmailController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FerozoEmailController.prototype, "getStoredEmails", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("inbox-comara"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FerozoEmailController.prototype, "getComaraInboxEmails", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("inbox-proveedores"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FerozoEmailController.prototype, "getProveedoresInboxEmails", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("send-quotation"),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Body)("supplierId")),
    __param(2, (0, common_1.Body)("messageId")),
    __param(3, (0, common_1.Body)("companyName")),
    __param(4, (0, common_1.Body)("companyEmail")),
    __param(5, (0, common_1.Body)("message")),
    __param(6, (0, common_1.Body)("destination")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FerozoEmailController.prototype, "sendQuotationEmail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("send-supplier-email"),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Body)("supplierId")),
    __param(2, (0, common_1.Body)("messageId")),
    __param(3, (0, common_1.Body)("companyName")),
    __param(4, (0, common_1.Body)("companyEmail")),
    __param(5, (0, common_1.Body)("message")),
    __param(6, (0, common_1.Body)("destination")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FerozoEmailController.prototype, "sendSupplierEmail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('general-orders/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FerozoEmailController.prototype, "sendGeneralOrdersEmail", null);
exports.FerozoEmailController = FerozoEmailController = FerozoEmailController_1 = __decorate([
    (0, common_1.Controller)("api/emails"),
    __metadata("design:paramtypes", [email_ferozo_service_1.FerozoEmailService])
], FerozoEmailController);
//# sourceMappingURL=email.ferozo.controller.js.map