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
exports.WhatsappController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
const prisma_service_1 = require("../prisma/prisma.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const fs = require("fs");
const path = require("path");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
let WhatsappController = class WhatsappController {
    constructor(whatsappService, prisma) {
        this.whatsappService = whatsappService;
        this.prisma = prisma;
        this.uploadPath = path.join(process.cwd(), "src", "whatsapp", "downloads");
    }
    getQRCode(user) {
        return this.whatsappService.getClientStatus().pipe((0, operators_1.switchMap)((status) => {
            if (status === "authenticated") {
                return (0, rxjs_1.of)({ message: "Client is already authenticated" });
            }
            else if (status === "qr") {
                return this.whatsappService.getQRCode().pipe((0, operators_1.take)(1), (0, operators_1.map)((qrCode) => ({ qrCode: qrCode })));
            }
            else if (status === "ready") {
                return (0, rxjs_1.of)({ message: "ready" });
            }
            else {
                return (0, rxjs_1.of)({ message: "Client status unknown" });
            }
        }), (0, operators_1.take)(1));
    }
    convertToSpanishDate(dateString) {
        const [datePart, timePart] = dateString.split(" at ");
        const date = new Date(datePart);
        const months = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} de ${month} de ${year} a las ${timePart}`;
    }
    async getPhoneNumber() {
        return this.whatsappService
            .getAuthenticatedPhoneNumber()
            .toPromise()
            .then((phoneNumber) => {
            if (phoneNumber) {
                return { phoneNumber: phoneNumber };
            }
            else {
                return {
                    message: "Client is not authenticated or phone number is not available",
                };
            }
        });
    }
    getCurrentUser(user) {
        return { currentUser: `${user.username}` };
    }
    setBotStatus(user, body) {
        this.whatsappService.setCurrentUserId(user.user_id);
        return { message: `Bot is now ${body.enabled ? "enabled" : "disabled"}` };
    }
    setIAStatus(user, body) {
        this.whatsappService.setIAEnabled(body.enabled);
        return { message: `IA is now ${body.enabled ? "enabled" : "disabled"}` };
    }
    async downloadFile(fileName, res) {
        const filePath = path.join(this.uploadPath, fileName);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException("El archivo no existe.");
        }
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "application/pdf");
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }
    async getAllMessages() {
        return this.whatsappService.getAllMessages();
    }
    async resendMessage(companyName, messageId, originalContact, destination, originalSender, message, expediente, hasFile, messageFile) {
        try {
            message = hasFile
                ? `${message} - Archivo adjunto: ${messageFile}`
                : `${message}`;
            await this.whatsappService.resendMessage(messageId, originalContact, destination, message, originalSender, expediente, companyName);
            return { status: "Message resent successfully" };
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to resend message: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendQuotationRequest(messageId, companyName, messageContent, destination, expediente, supplierId) {
        console.log(messageId, messageContent, expediente, supplierId);
        try {
            await this.whatsappService.sendMessage(messageId, destination.replace("+", "") + "@c.us", "Razon social: " + companyName + " " + messageContent, expediente, "", supplierId);
            return { message: "Cotización enviada exitosamente por WhatsApp." };
        }
        catch (error) {
            throw new common_1.HttpException(`Error al enviar la cotización: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getIPAddress(request) {
        return "";
    }
    async assignSupplierToMessage(messageId, userId, suppliersId, companyName, companyEmail) {
        const purchaseMessage = await this.whatsappService.assignSupplierToMessage(messageId, suppliersId, companyName, userId, companyEmail);
        return { message: "Supplier assigned successfully", purchaseMessage };
    }
    async unassignSupplier(messageId, supplierId, userId) {
        const updatedMessage = await this.whatsappService.unassignSupplierFromMessage(messageId, supplierId, userId);
        return {
            success: true,
            message: "Proveedor desasignado correctamente.",
            updatedMessage,
        };
    }
    async sendGeneralOrders(body) {
        try {
            const { userId, supplierId, supplierName, supplierPhone, items } = body;
            await this.whatsappService.sendGeneralOrder(userId, supplierId, supplierPhone.replace("+", ""), supplierName, items);
            return {
                message: `Pedido general enviado exitosamente a ${supplierName}.`,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Error al enviar el pedido general: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async hideMessage(messageId) {
        return this.whatsappService.hideMessage(messageId);
    }
    async restartClient(userId, request) {
        try {
            await this.whatsappService.restartClient();
            await this.prisma.userAudit.create({
                data: {
                    user_id: Number(userId),
                    action: "Restarted WhatsApp client",
                    details: `User ${userId} manually restarted the WhatsApp client.`,
                    ip_address: this.getIPAddress(request),
                },
            });
            return { message: "WhatsApp client restarted successfully" };
        }
        catch (error) {
            console.error("Error restarting WhatsApp client:", error);
            return {
                message: "Failed to restart WhatsApp client",
                error: error.message,
            };
        }
    }
};
exports.WhatsappController = WhatsappController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("get-qr"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], WhatsappController.prototype, "getQRCode", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("phone-number"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "getPhoneNumber", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getUser"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("set-bot-status"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "setBotStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("set-ia-status"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "setIAStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("files/:fileName"),
    __param(0, (0, common_1.Param)("fileName")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "getAllMessages", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("resend"),
    __param(0, (0, common_1.Body)("companyName")),
    __param(1, (0, common_1.Body)("messageId")),
    __param(2, (0, common_1.Body)("originalContact")),
    __param(3, (0, common_1.Body)("destination")),
    __param(4, (0, common_1.Body)("originalSender")),
    __param(5, (0, common_1.Body)("message")),
    __param(6, (0, common_1.Body)("expediente")),
    __param(7, (0, common_1.Body)("hasFile")),
    __param(8, (0, common_1.Body)("messageFile")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, String, String, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "resendMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("quotation/send"),
    __param(0, (0, common_1.Body)("messageId")),
    __param(1, (0, common_1.Body)("companyName")),
    __param(2, (0, common_1.Body)("message")),
    __param(3, (0, common_1.Body)("destination")),
    __param(4, (0, common_1.Body)("expediente")),
    __param(5, (0, common_1.Body)("supplierId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "sendQuotationRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("assign-suppliers/:messageId"),
    __param(0, (0, common_1.Param)("messageId")),
    __param(1, (0, common_1.Body)("userId")),
    __param(2, (0, common_1.Body)("suppliersId")),
    __param(3, (0, common_1.Body)("companyName")),
    __param(4, (0, common_1.Body)("companyEmail")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String, String]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "assignSupplierToMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("unassign-supplier/:messageId"),
    __param(0, (0, common_1.Param)("messageId")),
    __param(1, (0, common_1.Body)("supplierId")),
    __param(2, (0, common_1.Body)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "unassignSupplier", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("general-orders/send"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "sendGeneralOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("hide-message/:message_id"),
    __param(0, (0, common_1.Param)("message_id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "hideMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("restart-client"),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "restartClient", null);
exports.WhatsappController = WhatsappController = __decorate([
    (0, common_1.Controller)("api/whatsapp"),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService,
        prisma_service_1.PrismaService])
], WhatsappController);
//# sourceMappingURL=whatsapp.controller.js.map