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
exports.ExpedienteController = void 0;
const common_1 = require("@nestjs/common");
const expediente_service_1 = require("./expediente.service");
const create_expediente_dto_1 = require("./dto/create-expediente.dto/create-expediente.dto");
const jwt_auth_guard_1 = require("../jwt-auth/jwt-auth.guard");
let ExpedienteController = class ExpedienteController {
    constructor(expedienteService) {
        this.expedienteService = expedienteService;
    }
    async getAllExpedientes() {
        return await this.expedienteService.getAllExpedientes();
    }
    async createAndAssign(messageId, createExpedienteDto) {
        return this.expedienteService.createExpedienteAndAssignToMessage(createExpedienteDto, messageId);
    }
    async assignExpedienteToMessage(messageId, body) {
        return this.expedienteService.assignExpedienteToMessage(messageId, Number(body.expedienteId));
    }
    async createExpediente(createExpedienteDto) {
        return this.expedienteService.createExpediente(createExpedienteDto);
    }
    async getExpedienteById(expedienteId) {
        return await this.expedienteService.getExpedienteById(expedienteId);
    }
    async updateExpediente(expedienteId, expedienteData) {
        return await this.expedienteService.updateExpediente(expedienteId, expedienteData);
    }
    async deleteExpediente(expedienteId) {
        return await this.expedienteService.deleteExpediente(expedienteId);
    }
};
exports.ExpedienteController = ExpedienteController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "getAllExpedientes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':messageId'),
    __param(0, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_expediente_dto_1.CreateExpedienteDto]),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "createAndAssign", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('assign/:messageId'),
    __param(0, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "assignExpedienteToMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expediente_dto_1.CreateExpedienteDto]),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "createExpediente", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "getExpedienteById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "updateExpediente", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpedienteController.prototype, "deleteExpediente", null);
exports.ExpedienteController = ExpedienteController = __decorate([
    (0, common_1.Controller)('api/expedientes'),
    __metadata("design:paramtypes", [expediente_service_1.ExpedienteService])
], ExpedienteController);
//# sourceMappingURL=expediente.controller.js.map