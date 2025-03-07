import { ContactsWhatsappService } from './contacts.whatsapp.service';
import { ForwardingPhone } from '@prisma/client';
export declare class ContactsWhatsappController {
    private readonly whatsappContactService;
    constructor(whatsappContactService: ContactsWhatsappService);
    getAll(): Promise<ForwardingPhone[]>;
    getById(id: number): Promise<ForwardingPhone | null>;
    create(data: Omit<ForwardingPhone, 'id' | 'createdAt'>): Promise<ForwardingPhone>;
    update(id: number, data: Partial<ForwardingPhone>): Promise<ForwardingPhone>;
    delete(id: number): Promise<ForwardingPhone>;
}
