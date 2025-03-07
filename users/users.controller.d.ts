import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
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
    findAll(): Promise<{
        created_at: Date;
        user_id: number;
        updated_at: Date;
        username: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(userId: number): Promise<{
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
    update(userId: number, updateUserDto: UpdateUserDto): Promise<{
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
    remove(userId: number): Promise<{
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
