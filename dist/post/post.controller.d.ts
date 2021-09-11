import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { Post as PrismaPost } from '@prisma/client';
export declare class PostController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllPosts(): Promise<PrismaPost[]>;
    queryPost(username: string, id: string): Promise<PrismaPost | PrismaPost[]>;
    updatePost(id: string, request: Request): Promise<PrismaPost>;
    deletePost(id: string): Promise<PrismaPost>;
}
