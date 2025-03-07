import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto, userId: number, categoryId: number): Promise<{
        product_id: number;
        name: string;
        description: string | null;
        price: number | null;
        active: boolean;
        category_id: number;
        created_at: Date;
        created_by: number;
    }>;
    findAll(): Promise<{
        product_id: number;
        name: string;
        description: string | null;
        price: number | null;
        active: boolean;
        category_id: number;
        created_at: Date;
        created_by: number;
    }[]>;
    findOne(productId: number): Promise<{
        product_id: number;
        name: string;
        description: string | null;
        price: number | null;
        active: boolean;
        category_id: number;
        created_at: Date;
        created_by: number;
    }>;
    update(productId: number, updateProductDto: UpdateProductDto): Promise<{
        product_id: number;
        name: string;
        description: string | null;
        price: number | null;
        active: boolean;
        category_id: number;
        created_at: Date;
        created_by: number;
    }>;
    remove(productId: number): Promise<{
        product_id: number;
        name: string;
        description: string | null;
        price: number | null;
        active: boolean;
        category_id: number;
        created_at: Date;
        created_by: number;
    }>;
}
