import { ContactsEmailService } from './contacts.email.service';
import { ForwardingEmail } from '@prisma/client';
export declare class ContactsEmailController {
    private readonly emailContactService;
    constructor(emailContactService: ContactsEmailService);
    getAll(): Promise<ForwardingEmail[]>;
    getById(id: number): Promise<ForwardingEmail | null>;
    create(data: Omit<ForwardingEmail, 'id' | 'createdAt'>): Promise<ForwardingEmail>;
    update(id: number, data: Partial<ForwardingEmail>): Promise<ForwardingEmail>;
    delete(id: number): Promise<ForwardingEmail>;
}
