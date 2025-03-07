import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class RoleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllRoles(): Promise<{
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    assignRoleToUser(userId: number, role: Role): Promise<{
        user_id: number;
        username: string;
        password_hash: string;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
        updated_at: Date;
        created_by: number;
        updated_by: number;
        active: boolean;
    }>;
    removeRoleFromUser(userId: number): Promise<{
        user_id: number;
        username: string;
        password_hash: string;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
        updated_at: Date;
        created_by: number;
        updated_by: number;
        active: boolean;
    }>;
}
