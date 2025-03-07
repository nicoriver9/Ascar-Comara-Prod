import { FerozoEmailService } from "./email.ferozo.service";
export declare class FerozoEmailController {
    private readonly ferozoEmailService;
    private readonly logger;
    constructor(ferozoEmailService: FerozoEmailService);
    getStoredEmails(): Promise<({
        expediente: {
            expediente_name: string;
        };
        suppliers: {
            phone_number: string;
            email_address: string;
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
    getComaraInboxEmails(): Promise<{
        success: boolean;
        comaraEmails: void;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        comaraEmails?: undefined;
    }>;
    getProveedoresInboxEmails(): Promise<{
        success: boolean;
        proveedoresEmails: void;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        proveedoresEmails?: undefined;
    }>;
    sendQuotationEmail(userId: number, supplierId: number, messageId: number, companyName: string, companyEmail: string, messageContent: string, destination: string): Promise<{
        success: boolean;
        message: string;
    }>;
    sendSupplierEmail(userId: number, supplierId: number, messageId: number, companyName: string, companyEmail: string, messageContent: string, destination: string): Promise<{
        success: boolean;
        message: string;
    }>;
    sendGeneralOrdersEmail(body: {
        userId: number;
        supplierId: number;
        supplierName: string;
        supplierEmail: string;
        companyName: string;
        companyEmail: string;
        items: {
            messageId: number;
            messageContent: string;
            contactName: string;
        }[];
    }): Promise<{
        message: string;
    }>;
}
