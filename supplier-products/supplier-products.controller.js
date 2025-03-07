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
exports.SupplierProductsController = void 0;
const common_1 = require("@nestjs/common");
const supplier_products_service_1 = require("./supplier-products.service");
const create_supplier_product_dto_dto_1 = require("./dto/create-supplier-product-dto.dto/create-supplier-product-dto.dto");
const update_supplier_product_dto_dto_1 = require("./dto/update-supplier-product-dto.dto/update-supplier-product-dto.dto");
let SupplierProductsController = class SupplierProductsController {
    constructor(supplierProductsService) {
        this.supplierProductsService = supplierProductsService;
    }
    async create(supplierId, createSupplierProductDto) {
        return await this.supplierProductsService.create({
            ...createSupplierProductDto,
            supplier_id: supplierId,
        });
    }
    async findAll(supplierId) {
        return await this.supplierProductsService.findAllBySupplier(supplierId);
    }
    async update(supplierId, productId, updateSupplierProductDto) {
        return await this.supplierProductsService.update(supplierId, productId, updateSupplierProductDto);
    }
    async remove(supplierId, productId) {
        return await this.supplierProductsService.remove(supplierId, productId);
    }
};
exports.SupplierProductsController = SupplierProductsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('supplierId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_supplier_product_dto_dto_1.CreateSupplierProductDto]),
    __metadata("design:returntype", Promise)
], SupplierProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('supplierId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SupplierProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':productId'),
    __param(0, (0, common_1.Param)('supplierId')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_supplier_product_dto_dto_1.UpdateSupplierProductDto]),
    __metadata("design:returntype", Promise)
], SupplierProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    __param(0, (0, common_1.Param)('supplierId')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SupplierProductsController.prototype, "remove", null);
exports.SupplierProductsController = SupplierProductsController = __decorate([
    (0, common_1.Controller)('api/suppliers-products/:supplierId/products'),
    __metadata("design:paramtypes", [supplier_products_service_1.SupplierProductsService])
], SupplierProductsController);
//# sourceMappingURL=supplier-products.controller.js.map