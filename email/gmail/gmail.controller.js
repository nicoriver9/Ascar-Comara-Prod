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
var EmailController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const gmail_service_1 = require("./gmail.service");
const assert_1 = require("assert");
let EmailController = EmailController_1 = class EmailController {
    constructor(gmailService) {
        this.gmailService = gmailService;
        this.logger = new common_1.Logger(EmailController_1.name);
    }
    async fetchEmailsOnDemand() {
        try {
            await this.gmailService.fetchEmailsOnDemand();
            return { message: "Emails fetched successfully on demand." };
        }
        catch (error) {
            throw new common_1.HttpException("Failed to fetch emails on demand.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async storeSimulateEmails() {
        try {
            await this.gmailService.simulateEmails();
            return assert_1.ok;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getStoredEmails() {
        return this.gmailService.getAllMessages();
    }
    async sendEmail(userId, supplierId, companyName, messageId, originalContact, destination, originalSender, message, expediente) {
        const subject = `Expediente: ${expediente} - Mensaje orginal de ${originalSender} - (${originalContact})`;
        await this.gmailService.sendEmail(userId, supplierId, messageId, destination, subject, message, expediente, companyName);
        return { message: `Correo enviado a ${destination} exitosamente` };
    }
    async sendQuotationRequest(userId, supplierId, messageId, companyName, messageContent, destination) {
        try {
            const subject = `Cotización de ${companyName}`;
            const expediente = null;
            await this.gmailService.sendEmail(userId, supplierId, messageId, destination, subject, messageContent, expediente, companyName);
            return { message: "Cotización enviada exitosamente por Email." };
        }
        catch (error) {
            throw new common_1.HttpException(`Error al enviar la cotización: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Get)("fetch-on-demand"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "fetchEmailsOnDemand", null);
__decorate([
    (0, common_1.Post)("insert-simulate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "storeSimulateEmails", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getStoredEmails", null);
__decorate([
    (0, common_1.Post)("resend"),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Body)("supplierId")),
    __param(2, (0, common_1.Body)("companyName")),
    __param(3, (0, common_1.Body)("messageId")),
    __param(4, (0, common_1.Body)("originalContact")),
    __param(5, (0, common_1.Body)("destination")),
    __param(6, (0, common_1.Body)("originalSender")),
    __param(7, (0, common_1.Body)("message")),
    __param(8, (0, common_1.Body)("expediente")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)("quotation/send"),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Body)("supplierId")),
    __param(2, (0, common_1.Body)("messageId")),
    __param(3, (0, common_1.Body)("companyName")),
    __param(4, (0, common_1.Body)("message")),
    __param(5, (0, common_1.Body)("destination")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendQuotationRequest", null);
exports.EmailController = EmailController = EmailController_1 = __decorate([
    (0, common_1.Controller)("api/gmail"),
    __metadata("design:paramtypes", [gmail_service_1.GmailService])
], EmailController);
//# sourceMappingURL=gmail.controller.js.map