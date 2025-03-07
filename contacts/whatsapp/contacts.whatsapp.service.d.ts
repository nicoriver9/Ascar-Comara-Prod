import { PrismaService } from '../../prisma/prisma.service';
import { ForwardingPhone } from '@prisma/client';
export declare class ContactsWhatsappService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<ForwardingPhone[]>;
    getById(phone_id: number): Promise<ForwardingPhone | null>;
    create(data: Omit<ForwardingPhone, 'id' | 'createdAt'>): Promise<ForwardingPhone>;
    update(phone_id: number, data: Partial<ForwardingPhone>): Promise<ForwardingPhone>;
    delete(phone_id: number): Promise<ForwardingPhone>;
}
