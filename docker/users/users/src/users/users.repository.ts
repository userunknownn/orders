import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaErrorHandler } from './services/prisma-error-handler.service';
import { User } from './types/user.type';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaClient,
    private readonly prismaErrorHandler: PrismaErrorHandler) { }

  async findAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.prismaClient.user.findFirstOrThrow({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prismaErrorHandler.handleError(error);
      }
    }
  }

  async create(user: {
    first_name: string;
    last_name: string;
    document: string;
    email: string;
    phone_number: string;
    birth_date: Date;
  }): Promise<User> {
    try {
      return await this.prismaClient.user.create({
        data: { ...user },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prismaErrorHandler.handleError(error);
      }
    }
  }

  async delete(id: number): Promise<User> {
    try {
      return await this.prismaClient.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prismaErrorHandler.handleError(error);
      }
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      return await this.prismaClient.user.update({
        where: { id },
        data: { ...user },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.prismaErrorHandler.handleError(error);
      }
    }
  }
}
