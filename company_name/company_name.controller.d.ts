import { CompanyNameService } from './company_name.service';
import { Companies } from '@prisma/client';
export declare class CompanyNameController {
    private readonly companyService;
    constructor(companyService: CompanyNameService);
    updateCompanyName(messageId: number, companyName: Companies): Promise<{
        message: string;
        data: {
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
        };
    }>;
}
