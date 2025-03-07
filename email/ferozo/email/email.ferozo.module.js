"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FerozoEmailModule = void 0;
const common_1 = require("@nestjs/common");
const email_ferozo_service_1 = require("./email.ferozo.service");
const email_ferozo_controller_1 = require("./email.ferozo.controller");
const prisma_service_1 = require("../../../prisma/prisma.service");
const config_1 = require("@nestjs/config");
let FerozoEmailModule = class FerozoEmailModule {
};
exports.FerozoEmailModule = FerozoEmailModule;
exports.FerozoEmailModule = FerozoEmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
        ],
        controllers: [email_ferozo_controller_1.FerozoEmailController],
        providers: [email_ferozo_service_1.FerozoEmailService, prisma_service_1.PrismaService],
    })
], FerozoEmailModule);
//# sourceMappingURL=email.ferozo.module.js.map