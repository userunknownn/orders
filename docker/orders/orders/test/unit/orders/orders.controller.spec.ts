import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepository } from '../../../src/orders/orders.repository';
import { OrdersController } from '../../../src/orders/orders.controller';
import { OrdersService } from '../../../src/orders/orders.service';
import { PrismaClient } from '@prisma/client';
import { PrismaNotFoundException } from '../../../src/orders/exceptions/prisma-not-found.exception';
import { createOrderMock, updateOrderMock } from './mock/orders.mock';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: OrdersService,
          useValue: {
            getOrders: jest.fn(),
            getOrder: jest.fn(),
            createOrder: jest.fn((order) => order),
            deleteOrder: jest.fn(),
            updateOrder: jest.fn(),
          },
        },
        OrdersRepository,
        PrismaClient,
      ],
    }).compile();

    controller = app.get<OrdersController>(OrdersController);
    service = app.get<OrdersService>(OrdersService);
  });

  describe('getOrders', () => {
    it('should call OrdersService getOrders method', () => {
      controller.getOrders();

      expect(service.getOrders).toBeCalled();
    });
  });

  describe('getOrder', () => {
    it('should call OrdersService getOrder method', () => {
      controller.getOrder({ id: 1 });

      expect(service.getOrder).toBeCalled();
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(service, 'getOrder')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.getOrder({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('createOrder', () => {
    it('should call OrdersService createOrder with the correct value', async () => {
      controller.createOrder(createOrderMock);

      expect(service.createOrder).toBeCalledWith(createOrderMock);
    });
  });

  describe('deleteOrder', () => {
    it('should call OrdersService deleteOrder with the correct value', async () => {
      controller.deleteOrder({ id: 1 });

      expect(service.deleteOrder).toBeCalledWith({ id: 1 });
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(service, 'deleteOrder')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.deleteOrder({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('updateOrder', () => {
    it('should call OrdersService updateOrder with the correct value', async () => {
      const order = controller.createOrder(createOrderMock);
      controller.updateOrder(
        { id: 1 },
        { ...order, description: 'bola de gude' },
      );

      expect(service.updateOrder).toBeCalledWith(
        { id: 1 },
        {
          ...order,
          description: 'bola de gude',
        },
      );
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(service, 'updateOrder')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.updateOrder({ id: 0 }, updateOrderMock),
      ).rejects.toThrowError('There is no records found');
    });
  });
});
