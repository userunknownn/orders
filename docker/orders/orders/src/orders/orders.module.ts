import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { PrismaClient } from '@prisma/client';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, PrismaClient],
})
export class OrdersModule {}
