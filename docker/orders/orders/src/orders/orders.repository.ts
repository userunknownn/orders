import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.dto';
import { PrismaErrors } from './enum/prisma-errors.enum';
import { PrismaConstraintViolationException } from './exceptions/prisma-constraint-violation.exception';
import { PrismaNotFoundException } from './exceptions/prisma-not-found.exception';
import { Order } from './types/order.type';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Order[]> {
    return await this.prismaClient.order.findMany();
  }

  async findOne(id: number): Promise<Order> {
    try {
      return await this.prismaClient.order.findFirstOrThrow({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.NOT_FOUND)
          throw new PrismaNotFoundException();
        else console.log('eita');
      }
    }
  }

  async create(order: CreateOrderRequest): Promise<Order> {
    try {
      return await this.prismaClient.order.create({ data: order });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.CONSTRAINT_VIOLATION)
          throw new PrismaConstraintViolationException();
      }
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      return await this.prismaClient.order.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.NOT_FOUND)
          throw new PrismaNotFoundException();
      }
    }
  }

  async update(id: number, order: UpdateOrderRequest): Promise<Order> {
    try {
      return await this.prismaClient.order.update({
        where: { id },
        data: order,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == PrismaErrors.NOT_FOUND)
          throw new PrismaNotFoundException();
      }
    }
  }
}
