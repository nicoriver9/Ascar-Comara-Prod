import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierProductDto } from './dto/create-supplier-product-dto.dto/create-supplier-product-dto.dto';
import { UpdateSupplierProductDto } from './dto/update-supplier-product-dto.dto/update-supplier-product-dto.dto';
export declare class SupplierProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSupplierProductDto: CreateSupplierProductDto): Promise<{
        supplier_product_id: number;
        supplier_id: number;
        product_id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
    }>;
    findAllBySupplier(supplierId: number): Promise<({
        product: {
            product_id: number;
            name: string;
            description: string | null;
            price: number | null;
            active: boolean;
            category_id: number;
            created_at: Date;
            created_by: number;
        };
    } & {
        supplier_product_id: number;
        supplier_id: number;
        product_id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
    })[]>;
    update(supplierId: number, productId: number, updateSupplierProductDto: UpdateSupplierProductDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(supplierId: number, productId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
