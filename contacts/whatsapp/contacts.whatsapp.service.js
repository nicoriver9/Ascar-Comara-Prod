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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsWhatsappService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ContactsWhatsappService = class ContactsWhatsappService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.forwardingPhone.findMany();
    }
    async getById(phone_id) {
        return this.prisma.forwardingPhone.findUnique({ where: { phone_id } });
    }
    async create(data) {
        return this.prisma.forwardingPhone.create({ data });
    }
    async update(phone_id, data) {
        return this.prisma.forwardingPhone.update({ where: { phone_id }, data });
    }
    async delete(phone_id) {
        return this.prisma.forwardingPhone.delete({ where: { phone_id } });
    }
};
exports.ContactsWhatsappService = ContactsWhatsappService;
exports.ContactsWhatsappService = ContactsWhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsWhatsappService);
//# sourceMappingURL=contacts.whatsapp.service.js.map