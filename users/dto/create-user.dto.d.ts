import { Role } from '@prisma/client';
export declare class CreateUserDto {
    username: string;
    password: string;
    role: Role;
    created_by: number;
    updated_by: number;
}
