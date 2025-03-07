import { PrismaService } from '../prisma/prisma.service';
import { Companies } from '@prisma/client';
export declare class CompanyNameService {
    private prisma;
    constructor(prisma: PrismaService);
    updateCompanyName(messageId: number, companyName: Companies): Promise<{
        message_id: number;
        source: import(".prisma/client").$Enums.MessageSource;
        phone_number: string | null;
        email_address: string | null;
        received_at: Date;
        content: string;
        contact_name: string;
        has_file: boolean;
        expediente_id: number | null;
        created_at: Date;
        forwarded: boolean;
        processed: boolean;
        forwarded_by: number | null;
        hide_message: boolean;
        company_name: import(".prisma/client").$Enums.Companies | null;
        custom_message: boolean;
    }>;
}
