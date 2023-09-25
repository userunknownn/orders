import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrdersModule } from '../../src/orders/orders.module';
import { PrismaClient } from '@prisma/client';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule],
    }).compile();

    prisma = new PrismaClient();
    await prisma.order.deleteMany();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/orders (GET)', () => {
    it('should return empty if no orders are registered', () => {
      return request(app.getHttpServer())
        .get('/orders')
        .expect(200)
        .expect([]);
    });
  });
});
