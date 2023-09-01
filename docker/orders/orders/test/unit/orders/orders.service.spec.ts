import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { OrdersRepository } from '../../../src/orders/orders.repository';
import { OrdersService } from '../../../src/orders/orders.service';
import { createOrderMock, updateOrderMock } from './mock/orders.mock';
import { HttpService } from '@nestjs/axios';
import { PrismaNotFoundException } from '../../../src/orders/exceptions/prisma-not-found.exception';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: OrdersRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        OrdersService,
        OrdersRepository,
        {
          provide: OrdersRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(createOrderMock), //created
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        HttpService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockResolvedValue([]),
          },
        },
        PrismaClient,
      ],
    }).compile();

    service = app.get<OrdersService>(OrdersService);
    repository = app.get<OrdersRepository>(OrdersRepository);
  });

  describe('getOrders', () => {
    it('should return get the orders list', async () => {
      jest.spyOn(repository, 'findAll').mockImplementationOnce(async () => []);

      const orders = await service.getOrders();

      expect(orders).toStrictEqual([]);
    });
  });

  describe('getOrder', () => {
    it('should return just a order from the repository', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => createOrderMock); //created

      const order = await service.getOrder({ id: 1 });

      expect(order).toStrictEqual(createOrderMock);
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(
        async () => await service.getOrder({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('createOrder', () => {
    it('should create a order', async () => {
      const validateUserMock = jest.spyOn(service as any, 'validateUser');
      validateUserMock.mockResolvedValue({
        data: {},
      });

      jest
        .spyOn(service, 'getOrders')
        .mockImplementationOnce(async () => [createOrderMock]);

      await service.createOrder(createOrderMock);
      const orders = await service.getOrders();

      expect(orders).toStrictEqual([createOrderMock]);

      validateUserMock.mockRestore();
    });
  });

  describe('deleteOrder', () => {
    it('should delete a order', async () => {
      await service.deleteOrder({ id: 1 });

      expect(repository.delete).toBeCalled();
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(async () => {
        await service.deleteOrder({ id: 0 });
      }).rejects.toThrowError('There is no records found');
    });
  });

  describe('updateOrder', () => {
    it('should update a order', async () => {
      await service.updateOrder(
        {
          id: 1,
        },
        updateOrderMock,
      );

      expect(repository.update).toBeCalledWith(1, updateOrderMock);
    });

    it('should throw an error if the order does not exists', () => {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValueOnce(new PrismaNotFoundException());
      expect(
        async () => await service.updateOrder({ id: 0 }, updateOrderMock),
      ).rejects.toThrowError('There is no records found');
    });
  });
});
