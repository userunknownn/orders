import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.dto';
import { PrismaErrorHandler } from './services/prisma-error-handler.service';
import { Order } from './types/order.type';

@Injectable()
export class OrdersRepository {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly prismaErrorHandler: PrismaErrorHandler
  ) { }

  async findAll(): Promise<Order[]> {
    return await this.prismaClient.order.findMany();
  }

  async findOne(id: number): Promise<Order> {
    try {
      return await this.prismaClient.order.findFirstOrThrow({ where: { id } });
    } catch (error) {
      if (this.prismaErrorHandler.isPrimaError(error))
        this.prismaErrorHandler.handleError(error);
    }
  }

  async create(order: CreateOrderRequest): Promise<Order> {
    try {
      return await this.prismaClient.order.create({ data: order });
    } catch (error) {
      if (this.prismaErrorHandler.isPrimaError(error))
        this.prismaErrorHandler.handleError(error);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      return await this.prismaClient.order.delete({ where: { id } });
    } catch (error) {
      if (this.prismaErrorHandler.isPrimaError(error))
        this.prismaErrorHandler.handleError(error);
    }
  }

  async update(id: number, order: UpdateOrderRequest): Promise<Order> {
    try {
      return await this.prismaClient.order.update({
        where: { id },
        data: order,
      });
    } catch (error) {
      if (this.prismaErrorHandler.isPrimaError(error))
        this.prismaErrorHandler.handleError(error);
    }
  }
}
