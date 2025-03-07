import { PrismaService } from '../../prisma/prisma.service';
import { ForwardingEmail } from '@prisma/client';
export declare class ContactsEmailService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<ForwardingEmail[]>;
    getById(email_id: number): Promise<ForwardingEmail | null>;
    create(data: Omit<ForwardingEmail, 'id' | 'createdAt'>): Promise<ForwardingEmail>;
    update(email_id: number, data: Partial<ForwardingEmail>): Promise<ForwardingEmail>;
    delete(email_id: number): Promise<ForwardingEmail>;
}
