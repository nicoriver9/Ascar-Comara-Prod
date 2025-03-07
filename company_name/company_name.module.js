"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyNameModule = void 0;
const common_1 = require("@nestjs/common");
const company_name_service_1 = require("./company_name.service");
const company_name_controller_1 = require("./company_name.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let CompanyNameModule = class CompanyNameModule {
};
exports.CompanyNameModule = CompanyNameModule;
exports.CompanyNameModule = CompanyNameModule = __decorate([
    (0, common_1.Module)({
        controllers: [company_name_controller_1.CompanyNameController],
        providers: [company_name_service_1.CompanyNameService, prisma_service_1.PrismaService],
    })
], CompanyNameModule);
//# sourceMappingURL=company_name.module.js.map