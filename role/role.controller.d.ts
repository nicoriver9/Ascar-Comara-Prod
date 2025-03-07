import { RoleService } from './role.service';
import { Role } from '@prisma/client';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    getAllRoles(): Promise<{
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    assignRoleToUser(userId: number, body: {
        role: Role;
    }): Promise<{
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
