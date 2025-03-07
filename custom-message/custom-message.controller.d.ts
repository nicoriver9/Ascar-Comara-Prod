import { CustomMessageService } from './custom-message.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class CustomMessageController {
    private readonly customMessageService;
    private readonly prisma;
    constructor(customMessageService: CustomMessageService, prisma: PrismaService);
    getAllCustomMessages(): Promise<({
        expediente: {
            expediente_name: string;
        };
        suppliers: {
            name: string;
            supplier_id: number;
        }[];
    } & {
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
    })[]>;
    getCustomMessageById(id: number): Promise<{
        message: {
            expediente: {
                expediente_name: string;
            };
            suppliers: {
                name: string;
                supplier_id: number;
            }[];
        } & {
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
    createCustomMessage(content: string, contactName: string, destination: string, companyName: string, expedienteId?: number): Promise<{
        message: {
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
    sendCustomMessage(id: number): Promise<{
        message: string;
    }>;
}
