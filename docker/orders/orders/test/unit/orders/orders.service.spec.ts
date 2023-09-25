import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepository } from '../../../src/orders/orders.repository';
import { OrdersService } from '../../../src/orders/orders.service';
import { createOrderMock, updateOrderMock } from './mock/orders.mock';
import { PrismaNotFoundException } from '../../../src/orders/exceptions/prisma-not-found.exception';
import { UserValidatorService } from '../../../src/orders/services/user-validator.service';

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
            create: jest.fn().mockResolvedValue(createOrderMock),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        UserValidatorService,
        {
          provide: UserValidatorService,
          useValue: {
            validateByUserId: jest.fn().mockResolvedValue({ data: {} })
          }
        },
      ],
    }).compile();

    service = app.get<OrdersService>(OrdersService);
    repository = app.get<OrdersRepository>(OrdersRepository);
  });

  describe('getAll', () => {
    it('should return get the orders list', async () => {
      jest.spyOn(repository, 'findAll').mockImplementationOnce(async () => []);

      const orders = await service.getAll();

      expect(orders).toStrictEqual([]);
    });
  });

  describe('getById', () => {
    it('should return just a order from the repository', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => createOrderMock); //created

      const order = await service.getById({ id: 1 });

      expect(order).toStrictEqual(createOrderMock);
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(
        async () => await service.getById({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('create', () => {
    it('should create a order', async () => {
      await service.create(createOrderMock);

      expect(repository.create).toBeCalledWith(createOrderMock);
    });
  });

  describe('deleteOrder', () => {
    it('should delete a order', async () => {
      await service.delete({ id: 1 });

      expect(repository.delete).toBeCalled();
    });

    it('should throw an error if the order is not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(async () => {
        await service.delete({ id: 0 });
      }).rejects.toThrowError('There is no records found');
    });
  });

  describe('updateOrder', () => {
    it('should update a order', async () => {
      await service.update(
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
        async () => await service.update({ id: 0 }, updateOrderMock),
      ).rejects.toThrowError('There is no records found');
    });
  });
});
