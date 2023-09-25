import {
  Injectable,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderIdentification } from './types/order-identification.type';

@Injectable()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) { }

  @Get()
  getOrders(): Promise<any> {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  getOrder(@Param() id: OrderIdentification): Promise<any> {
    return this.service.getById(id);
  }

  @Post()
  createOrder(@Body() request: CreateOrderRequest): Promise<any> {
    return this.service.create(request);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  deleteOrder(@Param() id: OrderIdentification): Promise<any> {
    return this.service.delete(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  updateOrder(
    @Param() id: OrderIdentification,
    @Body() request: UpdateOrderRequest,
  ): Promise<any> {
    return this.service.update(id, request);
  }
}
