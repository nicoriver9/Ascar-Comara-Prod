import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user_id: any;
        username: any;
        role: any;
    }>;
    register(userDto: any): Promise<{
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
