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
exports.SupplierProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SupplierProductsService = class SupplierProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSupplierProductDto) {
        const { supplier_id, product_id, price } = createSupplierProductDto;
        return await this.prisma.supplierProduct.create({
            data: {
                supplier_id,
                product_id,
                price,
            },
        });
    }
    async findAllBySupplier(supplierId) {
        return await this.prisma.supplierProduct.findMany({
            where: {
                supplier_id: supplierId,
            },
            include: {
                product: true,
            },
        });
    }
    async update(supplierId, productId, updateSupplierProductDto) {
        return await this.prisma.supplierProduct.updateMany({
            where: {
                supplier_id: supplierId,
                product_id: productId,
            },
            data: updateSupplierProductDto,
        });
    }
    async remove(supplierId, productId) {
        return await this.prisma.supplierProduct.deleteMany({
            where: {
                supplier_id: supplierId,
                product_id: productId,
            },
        });
    }
};
exports.SupplierProductsService = SupplierProductsService;
exports.SupplierProductsService = SupplierProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupplierProductsService);
//# sourceMappingURL=supplier-products.service.js.map