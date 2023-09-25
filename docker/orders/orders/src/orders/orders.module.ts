import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { PrismaClient } from '@prisma/client';
import { HttpModule } from '@nestjs/axios';
import { UserValidatorService } from './services/user-validator.service';
import { PrismaErrorHandler } from './services/prisma-error-handler.service';
@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, PrismaClient, UserValidatorService, PrismaErrorHandler],
})
export class OrdersModule { }
