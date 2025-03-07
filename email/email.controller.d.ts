import { GmailService } from "./email.service";
import { ok } from "assert";
export declare class EmailController {
    private readonly gmailService;
    private readonly logger;
    constructor(gmailService: GmailService);
    fetchEmailsOnDemand(): Promise<{
        message: string;
    }>;
    storeSimulateEmails(): Promise<typeof ok>;
    getStoredEmails(): Promise<{
        supplier_name: string;
        expediente: {
            expediente_name: string;
        };
        suppliers: {
            phone_number: string;
            email_address: string;
            name: string;
            supplier_id: number;
        }[];
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
    }[]>;
    sendEmail(userId: number, supplierId: number, companyName: string, messageId: number, originalContact: string, destination: string, originalSender: string, message: string, expediente: number): Promise<{
        message: string;
    }>;
    sendQuotationRequest(userId: number, supplierId: number, messageId: number, companyName: string, messageContent: string, destination: string): Promise<{
        message: string;
    }>;
}
