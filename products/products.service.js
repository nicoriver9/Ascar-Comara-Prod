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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto, userId, categoryId) {
        const { name, description, price } = createProductDto;
        return await this.prisma.product.create({
            data: {
                name,
                description,
                price,
                created_by: userId,
                category_id: categoryId,
            },
        });
    }
    async findAll() {
        return await this.prisma.product.findMany();
    }
    async findOne(productId) {
        return await this.prisma.product.findUnique({
            where: { product_id: productId },
        });
    }
    async update(productId, updateProductDto) {
        return await this.prisma.product.update({
            where: { product_id: productId },
            data: updateProductDto,
        });
    }
    async remove(productId) {
        return await this.prisma.product.update({
            where: { product_id: productId },
            data: {
                active: false,
            },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map