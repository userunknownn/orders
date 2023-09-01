import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

import { OrdersRepository } from './orders.repository';
import { OrderIdentification } from './types/order-identification.type';
import { Order } from './types/order.type';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly httpService: HttpService,
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async getOrder({ id }: OrderIdentification): Promise<Order> {
    return this.repository.findOne(Number(id));
  }

  async createOrder(order: CreateOrderRequest): Promise<Order> {
    try {
      await this.validateUser(order.user_id);
      return this.repository.create(order);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  async deleteOrder({ id }: OrderIdentification): Promise<Order> {
    return this.repository.delete(Number(id));
  }

  async updateOrder(
    { id }: OrderIdentification,
    order: UpdateOrderRequest,
  ): Promise<Order> {
    return this.repository.update(Number(id), order);
  }

  private async validateUser(id: number) {
    return await lastValueFrom(
      this.httpService.get(`http://api_gateway/users/${id}`),
    );
  }
}
