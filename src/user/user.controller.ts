import { User, Post as PrismaPost } from '.prisma/client';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

interface UserData {
  username: string;
  password: string;
}
export interface PostData {
  title: string;
  content: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  @Get('/unique/:id')
  async getUserByID(@Param('id') id: string): Promise<User> {
    const _id = parseInt(id);
    return await this.prismaService.user.findUnique({ where: { id: _id } });
  }

  @Get('/unique')
  async getUserByUsernameQuery(
    @Query('username') username: string,
  ): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { username } });
  }

  @Post()
  async createUser(@Req() request: Request): Promise<User> {
    const { username, password } = request.body as UserData;
    return await this.prismaService.user.create({
      data: { username, password },
    });
  }

  @Post('/:id')
  async createPostByUserID(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<PrismaPost> {
    const _id = parseInt(id);
    const { title, content } = request.body as PostData;
    return this.prismaService.post.create({
      data: { title, content, user: { connect: { id: _id } } },
    });
  }

  @Put('/:id')
  async updateUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<User> {
    const _id = parseInt(id);
    const { username, password } = request.body as UserData;
    return await this.prismaService.user.update({
      where: { id: _id },
      data: { username, password },
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    const _id = parseInt(id);
    return await this.prismaService.user.delete({ where: { id: _id } });
  }
}
