import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDtos: CreateSupplierDto[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    findAll(): Promise<{
        phone_number: string;
        email_address: string;
        name: string;
        supplier_id: number;
        active: boolean;
    }[]>;
    findOne(supplierId: number): Promise<{
        supplier_id: number;
        name: string;
        phone_number: string | null;
        email_address: string | null;
        address: string | null;
        created_at: Date;
        created_by: number;
        active: boolean;
    }>;
    update(updateSupplierDto: UpdateSupplierDto): Promise<{
        supplier_id: number;
        name: string;
        phone_number: string | null;
        email_address: string | null;
        address: string | null;
        created_at: Date;
        created_by: number;
        active: boolean;
    }>;
    remove(supplierId: number): Promise<{
        supplier_id: number;
        name: string;
        phone_number: string | null;
        email_address: string | null;
        address: string | null;
        created_at: Date;
        created_by: number;
        active: boolean;
    }>;
}
