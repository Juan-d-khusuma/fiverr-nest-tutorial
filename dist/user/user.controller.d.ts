import { User, Post as PrismaPost } from '.prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
export interface PostData {
    title: string;
    content: string;
}
export declare class UserController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllUser(): Promise<User[]>;
    getUserByID(id: string): Promise<User>;
    getUserByUsernameQuery(username: string): Promise<User>;
    createUser(request: Request): Promise<User>;
    createPostByUserID(id: string, request: Request): Promise<PrismaPost>;
    updateUser(request: Request, id: string): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
