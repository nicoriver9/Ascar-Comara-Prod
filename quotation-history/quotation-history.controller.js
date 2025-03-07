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
exports.QuotationHistoryController = void 0;
const common_1 = require("@nestjs/common");
const quotation_history_service_1 = require("./quotation-history.service");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
let QuotationHistoryController = class QuotationHistoryController {
    constructor(quotationHistoryService) {
        this.quotationHistoryService = quotationHistoryService;
    }
    async getAllQuotationHistory() {
        try {
            return await this.quotationHistoryService.getAll();
        }
        catch (error) {
            throw new common_1.HttpException("Error al obtener el historial de cotizaciones enviadas", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSentQuotationHistory() {
        try {
            return await this.quotationHistoryService.getSent();
        }
        catch (error) {
            throw new common_1.HttpException("Error al obtener el historial de cotizaciones enviadas", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getQuotationHistoryById(id) {
        const record = await this.quotationHistoryService.getById(Number(id));
        if (!record) {
            throw new common_1.NotFoundException(`No se encontró el registro con ID ${id}`);
        }
        return record;
    }
    async getUnsentQuotations() {
        try {
            return await this.quotationHistoryService.getUnsentQuotations();
        }
        catch (error) {
            throw new common_1.HttpException("Error al obtener los pedidos no enviados", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createQuotationHistory(data) {
        try {
            return await this.quotationHistoryService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException("Error al crear un nuevo registro en el historial", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateQuotationHistory(messageId, supplierId, messageContent) {
        try {
            return await this.quotationHistoryService.update(messageId, supplierId, messageContent);
        }
        catch (error) {
            throw new common_1.HttpException("Error al actualizar el registro en el historial", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteQuotationHistory(id) {
        try {
            await this.quotationHistoryService.delete(id);
            return { message: `Registro con ID ${id} eliminado con éxito.` };
        }
        catch (error) {
            throw new common_1.HttpException("Error al eliminar el registro en el historial", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.QuotationHistoryController = QuotationHistoryController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "getAllQuotationHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("sent"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "getSentQuotationHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("message/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "getQuotationHistoryById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("unsent"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "getUnsentQuotations", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "createQuotationHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("update"),
    __param(0, (0, common_1.Body)("messageId")),
    __param(1, (0, common_1.Body)("supplierId")),
    __param(2, (0, common_1.Body)("messageContent")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "updateQuotationHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuotationHistoryController.prototype, "deleteQuotationHistory", null);
exports.QuotationHistoryController = QuotationHistoryController = __decorate([
    (0, common_1.Controller)("api/quotation-history"),
    __metadata("design:paramtypes", [quotation_history_service_1.QuotationHistoryService])
], QuotationHistoryController);
//# sourceMappingURL=quotation-history.controller.js.map