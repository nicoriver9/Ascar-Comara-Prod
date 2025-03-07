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
exports.CompanyNameController = void 0;
const common_1 = require("@nestjs/common");
const company_name_service_1 = require("./company_name.service");
const client_1 = require("@prisma/client");
let CompanyNameController = class CompanyNameController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async updateCompanyName(messageId, companyName) {
        try {
            const updatedMessage = await this.companyService.updateCompanyName(messageId, companyName);
            return {
                message: 'Nombre de la compañía actualizado correctamente',
                data: updatedMessage,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CompanyNameController = CompanyNameController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('message_id')),
    __param(1, (0, common_1.Body)('company_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CompanyNameController.prototype, "updateCompanyName", null);
exports.CompanyNameController = CompanyNameController = __decorate([
    (0, common_1.Controller)('api/company-name'),
    __metadata("design:paramtypes", [company_name_service_1.CompanyNameService])
], CompanyNameController);
//# sourceMappingURL=company_name.controller.js.map