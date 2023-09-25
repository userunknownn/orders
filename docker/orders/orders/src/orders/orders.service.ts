import { Injectable } from '@nestjs/common';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

import { OrdersRepository } from './orders.repository';
import { OrderIdentification } from './types/order-identification.type';
import { Order } from './types/order.type';
import { UserValidatorService } from './services/user-validator.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly userValidatorService: UserValidatorService,
  ) { }

  async getAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async getById({ id }: OrderIdentification): Promise<Order> {
    return this.repository.findOne(Number(id));
  }

  async create(order: CreateOrderRequest): Promise<Order> {
    try {
      return await this.createOrderIfUserValid(order);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  async delete({ id }: OrderIdentification): Promise<Order> {
    return this.repository.delete(Number(id));
  }

  async update(
    { id }: OrderIdentification,
    order: UpdateOrderRequest,
  ): Promise<Order> {
    return this.repository.update(Number(id), order);
  }
  private async createOrderIfUserValid(order: CreateOrderRequest) {
    await this.userValidatorService.validateByUserId(order.user_id);
    return this.repository.create(order);
  }
}
