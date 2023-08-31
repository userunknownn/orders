import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaErrors } from './enum/prisma-errors.enum';
import { PrismaConstraintViolationException } from './exceptions/prisma-constraint-violation.exception';
import { PrismaNotFoundException } from './exceptions/prisma-not-found.exception';
import { User } from './types/user.type';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.prismaClient.user.findFirstOrThrow({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.NOT_FOUND)
          throw new PrismaNotFoundException();
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
    created_at: Date;
    updated_at: Date;
  }): Promise<User> {
    try {
      return await this.prismaClient.user.create({
        data: { ...user },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.CONSTRAINT_VIOLATION)
          throw new PrismaConstraintViolationException();
      }
    }
  }

  async delete(id: number): Promise<User> {
    try {
      return await this.prismaClient.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.NOT_FOUND)
          throw new PrismaNotFoundException();
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
        if (error.code == PrismaErrors.NOT_FOUND)
          throw new PrismaNotFoundException();
      }
    }
  }
}
