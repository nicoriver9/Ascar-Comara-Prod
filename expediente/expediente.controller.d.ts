import { ExpedienteService } from './expediente.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto/create-expediente.dto';
export declare class ExpedienteController {
    private readonly expedienteService;
    constructor(expedienteService: ExpedienteService);
    getAllExpedientes(): Promise<{
        expediente_id: number;
        expediente_name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    createAndAssign(messageId: number, createExpedienteDto: CreateExpedienteDto): Promise<any>;
    assignExpedienteToMessage(messageId: number, body: {
        expedienteId: number;
    }): Promise<{
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
    createExpediente(createExpedienteDto: CreateExpedienteDto): Promise<{
        expediente_id: number;
        expediente_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    getExpedienteById(expedienteId: number): Promise<{
        expediente_id: number;
        expediente_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    updateExpediente(expedienteId: number, expedienteData: {
        expediente_name: string;
    }): Promise<{
        expediente_id: number;
        expediente_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteExpediente(expedienteId: number): Promise<{
        expediente_id: number;
        expediente_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
