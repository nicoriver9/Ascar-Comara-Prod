import { WhatsappService } from "./whatsapp.service";
import { PrismaService } from "../prisma/prisma.service";
import { Observable } from "rxjs";
import { Request, Response } from "express";
export declare class WhatsappController {
    private readonly whatsappService;
    private readonly prisma;
    constructor(whatsappService: WhatsappService, prisma: PrismaService);
    private readonly uploadPath;
    getQRCode(user: any): Observable<any>;
    private convertToSpanishDate;
    getPhoneNumber(): Promise<{
        phoneNumber: string;
        message?: undefined;
    } | {
        message: string;
        phoneNumber?: undefined;
    }>;
    getCurrentUser(user: any): {
        currentUser: string;
    };
    setBotStatus(user: any, body: {
        enabled: boolean;
    }): {
        message: string;
    };
    setIAStatus(user: any, body: {
        enabled: boolean;
    }): {
        message: string;
    };
    downloadFile(fileName: string, res: Response): Promise<void>;
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
    resendMessage(companyName: string, messageId: number, originalContact: string, destination: string, originalSender: string, message: string, expediente: number, hasFile: boolean, messageFile: string): Promise<{
        status: string;
    }>;
    sendQuotationRequest(messageId: number, companyName: string, messageContent: string, destination: string, expediente: number, supplierId: number): Promise<{
        message: string;
    }>;
    private getIPAddress;
    assignSupplierToMessage(messageId: number, userId: number, suppliersId: number[], companyName: string, companyEmail: string): Promise<{
        message: string;
        purchaseMessage: {
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
        };
    }>;
    unassignSupplier(messageId: number, supplierId: number, userId: number): Promise<{
        success: boolean;
        message: string;
        updatedMessage: {
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
        };
    }>;
    sendGeneralOrders(body: {
        userId: number;
        supplierId: number;
        supplierName: string;
        supplierEmail: string;
        supplierPhone: string;
        items: {
            messageId: number;
            messageContent: string;
            contactName: string;
        }[];
    }): Promise<{
        message: string;
    }>;
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
    restartClient(userId: number, request: Request): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}
