"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMessageModule = void 0;
const common_1 = require("@nestjs/common");
const custom_message_controller_1 = require("./custom-message.controller");
const custom_message_service_1 = require("./custom-message.service");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomMessageModule = class CustomMessageModule {
};
exports.CustomMessageModule = CustomMessageModule;
exports.CustomMessageModule = CustomMessageModule = __decorate([
    (0, common_1.Module)({
        controllers: [custom_message_controller_1.CustomMessageController],
        providers: [custom_message_service_1.CustomMessageService, prisma_service_1.PrismaService],
        exports: [custom_message_service_1.CustomMessageService],
    })
], CustomMessageModule);
//# sourceMappingURL=custom-message.module.js.map