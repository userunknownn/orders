import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaErrorHandler } from './services/prisma-error-handler.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaClient, PrismaErrorHandler],
})
export class UsersModule { }
