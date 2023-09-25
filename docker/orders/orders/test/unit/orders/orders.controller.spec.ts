import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../../src/orders/orders.controller';
import { OrdersService } from '../../../src/orders/orders.service';
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
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn((order) => order),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<OrdersController>(OrdersController);
    service = app.get<OrdersService>(OrdersService);
  });

  describe('getOrders', () => {
    it('should call OrdersService getAll method', () => {
      controller.getOrders();

      expect(service.getAll).toBeCalled();
    });
  });

  describe('getOrder', () => {
    it('should call OrdersService getById method', () => {
      controller.getOrder({ id: 1 });

      expect(service.getById).toBeCalled();
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(service, 'getById')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.getOrder({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('createOrder', () => {
    it('should call OrdersService create with the correct value', async () => {
      controller.createOrder(createOrderMock);

      expect(service.create).toBeCalledWith(createOrderMock);
    });
  });

  describe('deleteOrder', () => {
    it('should call OrdersService delete with the correct value', async () => {
      controller.deleteOrder({ id: 1 });

      expect(service.delete).toBeCalledWith({ id: 1 });
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.deleteOrder({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('updateOrder', () => {
    it('should call OrdersService update with the correct value', async () => {
      const order = controller.createOrder(createOrderMock);
      controller.updateOrder(
        { id: 1 },
        { ...order, description: 'bola de gude' },
      );

      expect(service.update).toBeCalledWith(
        { id: 1 },
        {
          ...order,
          description: 'bola de gude',
        },
      );
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.updateOrder({ id: 0 }, updateOrderMock),
      ).rejects.toThrowError('There is no records found');
    });
  });
});
