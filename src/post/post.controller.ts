import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { Post as PrismaPost } from '@prisma/client';
import { PostData } from 'src/user/user.controller';

@Controller('post')
export class PostController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get()
  async getAllPosts() {
    return await this.prismaService.post.findMany();
  }

  @Get('/query')
  async queryPost(
    @Query('username') username: string,
    @Query('id') id: string,
  ): Promise<PrismaPost | PrismaPost[]> {
    const _id = parseInt(id);
    if (id)
      return await this.prismaService.post.findUnique({ where: { id: _id } });
    return await this.prismaService.post.findMany({
      where: { user: { username } },
    });
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<PrismaPost> {
    const _id = parseInt(id);
    const { title, content } = request.body as PostData;
    return await this.prismaService.post.update({
      where: { id: _id },
      data: { title, content },
    });
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string): Promise<PrismaPost> {
    const _id = parseInt(id);
    return await this.prismaService.post.delete({ where: { id: _id } });
  }
}
