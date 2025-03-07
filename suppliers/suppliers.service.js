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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SuppliersService = class SuppliersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMany(createSupplierDtos) {
        return await this.prisma.supplier.createMany({
            data: createSupplierDtos.map(dto => ({
                ...dto,
                created_by: 1,
            })),
        });
    }
    async findAll() {
        return this.prisma.supplier.findMany({
            select: {
                supplier_id: true,
                name: true,
                phone_number: true,
                email_address: true,
                active: true,
            },
        });
    }
    async findOne(supplierId) {
        return await this.prisma.supplier.findUnique({
            where: { supplier_id: supplierId },
        });
    }
    async update(supplierId, updateSupplierDto) {
        return await this.prisma.supplier.update({
            where: { supplier_id: supplierId },
            data: updateSupplierDto,
        });
    }
    async remove(supplierId) {
        return await this.prisma.supplier.update({
            where: { supplier_id: supplierId },
            data: { active: false },
        });
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map