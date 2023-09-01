import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.dto';

import { OrderIdentification } from './types/order-identification.type';
import { Order } from './types/order.type';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}

  async getOrders(): Promise<Order[]> {
    const { data } = await lastValueFrom(
      this.httpService.get(`http://orders/orders`),
    );

    return data;
  }

  async getOrder({ id }: OrderIdentification): Promise<Order> {
    const { data } = await lastValueFrom(
      this.httpService.get(`http://orders/orders/${id}`),
    );

    return data;
  }

  async createOrder(order: CreateOrderRequest): Promise<Order> {
    const { data } = await lastValueFrom(
      this.httpService.post(`http://orders/orders`, order),
    );

    return data;
  }

  async deleteOrder({ id }: OrderIdentification): Promise<Order> {
    const { data } = await lastValueFrom(
      this.httpService.delete(`http://orders/orders/${id}`),
    );

    return data;
  }

  async updateOrder(
    { id }: OrderIdentification,
    order: UpdateOrderRequest,
  ): Promise<Order> {
    const { data } = await lastValueFrom(
      this.httpService.patch(`http://orders/orders/${id}`, order),
    );

    return data;
  }
}
