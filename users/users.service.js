"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.prisma.user.create({
            data: {
                created_by: createUserDto.created_by ?? 1,
                updated_by: createUserDto.updated_by ?? 1,
                username: createUserDto.username,
                password_hash: hashedPassword,
                role: createUserDto.role,
            },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                user_id: true,
                username: true,
                role: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findOne(userId) {
        return await this.prisma.user.findUnique({
            where: { user_id: userId },
        });
    }
    async update(userId, updateUserDto) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        return await this.prisma.user.update({
            where: { user_id: userId },
            data: {
                created_by: updateUserDto.created_by ?? 1,
                updated_by: updateUserDto.updated_by ?? 1,
                username: updateUserDto.username,
                password_hash: hashedPassword,
                role: updateUserDto.role,
            }
        });
    }
    async remove(userId) {
        return await this.prisma.user.update({
            where: { user_id: userId },
            data: { active: false },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map