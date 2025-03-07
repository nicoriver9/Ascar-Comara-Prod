import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
export declare class GmailService implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly logger;
    private readonly imap;
    private monitorInterval;
    constructor(prisma: PrismaService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private fetchEmailsPeriodically;
    fetchEmailsOnDemand(): Promise<void>;
    private fetchNewEmails;
    simulateEmails(): Promise<void>;
    getAllMessages(): Promise<{
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
    sendEmail(userId: number, supplierId: number, messageId: number, destination: string, subject: string, fullMessage: string, expediente: number, companyName: string): Promise<number>;
}
