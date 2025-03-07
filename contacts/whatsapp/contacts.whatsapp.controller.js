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
exports.ContactsWhatsappController = void 0;
const common_1 = require("@nestjs/common");
const contacts_whatsapp_service_1 = require("./contacts.whatsapp.service");
let ContactsWhatsappController = class ContactsWhatsappController {
    constructor(whatsappContactService) {
        this.whatsappContactService = whatsappContactService;
    }
    async getAll() {
        return this.whatsappContactService.getAll();
    }
    async getById(id) {
        return this.whatsappContactService.getById(id);
    }
    async create(data) {
        return this.whatsappContactService.create(data);
    }
    async update(id, data) {
        return this.whatsappContactService.update(id, data);
    }
    async delete(id) {
        return this.whatsappContactService.delete(id);
    }
};
exports.ContactsWhatsappController = ContactsWhatsappController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactsWhatsappController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactsWhatsappController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactsWhatsappController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ContactsWhatsappController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactsWhatsappController.prototype, "delete", null);
exports.ContactsWhatsappController = ContactsWhatsappController = __decorate([
    (0, common_1.Controller)('api/whatsapp-contacts'),
    __metadata("design:paramtypes", [contacts_whatsapp_service_1.ContactsWhatsappService])
], ContactsWhatsappController);
//# sourceMappingURL=contacts.whatsapp.controller.js.map