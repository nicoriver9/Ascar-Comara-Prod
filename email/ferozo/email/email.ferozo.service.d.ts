import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../../prisma/prisma.service";
export declare class FerozoEmailService implements OnModuleInit {
    private readonly prisma;
    private readonly configService;
    private readonly logger;
    private transporterAscar;
    private transporterComara;
    constructor(prisma: PrismaService, configService: ConfigService);
    onModuleInit(): void;
    private handleAttachments;
    private fetchEmailsFromImap;
    cotizacionesFetchEmails(): Promise<void>;
    proveedoresFetchEmails(): Promise<void>;
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
    sendEmail(userId: number, supplierId: number, messageId: number, companyName: string, companyEmail: string, messageContent: string, destination: string): Promise<void>;
    sendGeneralOrderEmail(userId: number, supplierId: number, supplierEmail: string, supplierName: string, items: {
        messageId: number;
        messageContent: string;
        contactName: string;
    }[], companyEmail: string, companyName: string): Promise<void>;
}
