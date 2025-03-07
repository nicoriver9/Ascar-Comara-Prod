import { HttpService } from "@nestjs/axios";
import { PrismaService } from "../prisma/prisma.service";
import { Observable } from "rxjs";
export declare class WhatsappService {
    private readonly prisma;
    private readonly httpService;
    private readonly logger;
    private client;
    private clientInfo;
    private messageStatusMap;
    private clientStatus$;
    private qrCodeSubject$;
    private authenticatedPhoneNumber;
    private currentUserId;
    private botEnabled;
    private IAEnabled;
    constructor(prisma: PrismaService, httpService: HttpService);
    private initializeClient;
    private clearAuthAndCacheFolders;
    private nextID;
    private checkIfPurchaseOrder;
    sendMessage(messageId: number, to: string, message: string, expediente?: number, options?: string, supplierId?: number, userId?: number): Promise<number>;
    getAllMessages(): Promise<({
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
    hideMessage(messageId: number): Promise<{
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
    setCurrentUserId(userId: number): void;
    getQRCode(): Observable<string | null>;
    getClientStatus(): Observable<string>;
    getAuthenticatedPhoneNumber(): Observable<string | null>;
    setIAEnabled(enabled: boolean): void;
    resendMessage(messageId: number, originalContact: string, to: string, message: string, originalSender: string, expediente: number, companyName: string): Promise<void>;
    assignSupplierToMessage(messageId: number, suppliersId: number[], companyName: string, userId: number, companyEmail?: string): Promise<{
        suppliers: {
            supplier_id: number;
            name: string;
            phone_number: string | null;
            email_address: string | null;
            address: string | null;
            created_at: Date;
            created_by: number;
            active: boolean;
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
    }>;
    unassignSupplierFromMessage(messageId: number, supplierId: number, userId: number): Promise<{
        suppliers: {
            supplier_id: number;
            name: string;
            phone_number: string | null;
            email_address: string | null;
            address: string | null;
            created_at: Date;
            created_by: number;
            active: boolean;
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
    }>;
    sendGeneralOrder(userId: number, supplierId: number, supplierPhone: string, supplierName: string, items: {
        messageId: number;
        messageContent: string;
        contactName: string;
    }[]): Promise<void>;
    private sendMessageToSupplier;
    restartClient(): Promise<void>;
}
