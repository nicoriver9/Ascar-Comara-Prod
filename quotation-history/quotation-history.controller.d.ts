import { QuotationHistoryService } from "./quotation-history.service";
export declare class QuotationHistoryController {
    private readonly quotationHistoryService;
    constructor(quotationHistoryService: QuotationHistoryService);
    getAllQuotationHistory(): Promise<{
        user: {
            user_id: number;
            username: string;
        };
        supplier: {
            phone_number: string;
            email_address: string;
            name: string;
            supplier_id: number;
        };
        purchaseMessage: {
            message_id: number;
            contact_name: string;
        };
        message_id: number;
        created_at: Date;
        company_name: import(".prisma/client").$Enums.Companies;
        quotation_id: number;
        supplier_id: number;
        user_id: number;
        message_content: string;
        company_email: string;
        sent: boolean;
        sent_at: Date;
        updated_at: Date;
    }[]>;
    getSentQuotationHistory(): Promise<({
        user: {
            user_id: number;
            username: string;
        };
        supplier: {
            supplier_id: number;
            name: string;
            phone_number: string | null;
            email_address: string | null;
            address: string | null;
            created_at: Date;
            created_by: number;
            active: boolean;
        };
        purchaseMessage: {
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
    } & {
        quotation_id: number;
        message_id: number;
        supplier_id: number;
        user_id: number;
        sent_by: number | null;
        company_name: import(".prisma/client").$Enums.Companies;
        message_content: string;
        company_email: string | null;
        sent: boolean;
        sent_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    getQuotationHistoryById(id: number): Promise<{
        user: {
            user_id: number;
            username: string;
        };
        supplier: {
            phone_number: string;
            email_address: string;
            name: string;
            supplier_id: number;
        };
        purchaseMessage: {
            message_id: number;
            contact_name: string;
        };
        message_id: number;
        created_at: Date;
        company_name: import(".prisma/client").$Enums.Companies;
        quotation_id: number;
        supplier_id: number;
        user_id: number;
        message_content: string;
        company_email: string;
        sent: boolean;
        sent_at: Date;
        updated_at: Date;
    }[]>;
    getUnsentQuotations(): Promise<({
        user: {
            user_id: number;
            username: string;
        };
        supplier: {
            supplier_id: number;
            name: string;
            phone_number: string | null;
            email_address: string | null;
            address: string | null;
            created_at: Date;
            created_by: number;
            active: boolean;
        };
        purchaseMessage: {
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
    } & {
        quotation_id: number;
        message_id: number;
        supplier_id: number;
        user_id: number;
        sent_by: number | null;
        company_name: import(".prisma/client").$Enums.Companies;
        message_content: string;
        company_email: string | null;
        sent: boolean;
        sent_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    createQuotationHistory(data: any): Promise<{
        quotation_id: number;
        message_id: number;
        supplier_id: number;
        user_id: number;
        sent_by: number | null;
        company_name: import(".prisma/client").$Enums.Companies;
        message_content: string;
        company_email: string | null;
        sent: boolean;
        sent_at: Date | null;
        created_at: Date;
        updated_at: Date;
    }>;
    updateQuotationHistory(messageId: number, supplierId: number, messageContent: string): Promise<{
        quotation_id: number;
        message_id: number;
        supplier_id: number;
        user_id: number;
        sent_by: number | null;
        company_name: import(".prisma/client").$Enums.Companies;
        message_content: string;
        company_email: string | null;
        sent: boolean;
        sent_at: Date | null;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteQuotationHistory(id: number): Promise<{
        message: string;
    }>;
}
