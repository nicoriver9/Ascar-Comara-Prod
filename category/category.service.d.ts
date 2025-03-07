import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto/update-category.dto';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        Product: {
            product_id: number;
            name: string;
            description: string | null;
            price: number | null;
            active: boolean;
            category_id: number;
            created_at: Date;
            created_by: number;
        }[];
    } & {
        category_id: number;
        name: string;
        description: string | null;
        created_at: Date;
        created_by: number;
    }>;
    findAll(): Promise<({
        Product: {
            product_id: number;
            name: string;
            description: string | null;
            price: number | null;
            active: boolean;
            category_id: number;
            created_at: Date;
            created_by: number;
        }[];
    } & {
        category_id: number;
        name: string;
        description: string | null;
        created_at: Date;
        created_by: number;
    })[]>;
    findOne(categoryId: number): Promise<{
        Product: {
            product_id: number;
            name: string;
            description: string | null;
            price: number | null;
            active: boolean;
            category_id: number;
            created_at: Date;
            created_by: number;
        }[];
    } & {
        category_id: number;
        name: string;
        description: string | null;
        created_at: Date;
        created_by: number;
    }>;
    update(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        category_id: number;
        name: string;
        description: string | null;
        created_at: Date;
        created_by: number;
    }>;
    remove(categoryId: number): Promise<{
        category_id: number;
        name: string;
        description: string | null;
        created_at: Date;
        created_by: number;
    }>;
}
