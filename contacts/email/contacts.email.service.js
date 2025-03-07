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
exports.ContactsEmailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ContactsEmailService = class ContactsEmailService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.forwardingEmail.findMany();
    }
    async getById(email_id) {
        return this.prisma.forwardingEmail.findUnique({ where: { email_id } });
    }
    async create(data) {
        return this.prisma.forwardingEmail.create({ data });
    }
    async update(email_id, data) {
        return this.prisma.forwardingEmail.update({ where: { email_id }, data });
    }
    async delete(email_id) {
        return this.prisma.forwardingEmail.delete({ where: { email_id } });
    }
};
exports.ContactsEmailService = ContactsEmailService;
exports.ContactsEmailService = ContactsEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsEmailService);
//# sourceMappingURL=contacts.email.service.js.map