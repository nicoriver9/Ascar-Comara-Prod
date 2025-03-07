import { PrismaService } from 'src/prisma/prisma.service';
export declare class AttachmentsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getAllAttachments(): Promise<({
        purchase_message: {
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
        file_id: number;
        file_name: string;
        directory: string;
        message_id: number;
        created_at: Date;
    })[]>;
    getAttachmentById(id: number): Promise<{
        file_id: number;
        file_name: string;
        directory: string;
        message_id: number;
        created_at: Date;
    }>;
    getAttachmentsByMessageId(messageId: number): Promise<{
        file_id: number;
        file_name: string;
        directory: string;
        message_id: number;
        created_at: Date;
    }[]>;
}
