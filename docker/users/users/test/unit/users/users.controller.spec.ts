import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../../../src/users/users.repository';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { PrismaClient } from '@prisma/client';
import { createUserMock } from './mock/users.mock';
import { PrismaNotFoundException } from '../../../src/users/exceptions/prisma-not-found.exception';
import { PrismaErrorHandler } from '../../../src/users/services/prisma-error-handler.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
            getUser: jest.fn(),
            createUser: jest.fn((user) => user),
            deleteUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        UsersRepository,
        PrismaClient,
        PrismaErrorHandler
      ],
    }).compile();

    controller = app.get<UsersController>(UsersController);
    service = app.get<UsersService>(UsersService);
  });

  describe('getUsers', () => {
    it('should call UsersService getUsers method', () => {
      controller.getUsers();

      expect(service.getUsers).toBeCalled();
    });
  });

  describe('getUser', () => {
    it('should call UsersService getUser method', () => {
      controller.getUser({ id: 1 });

      expect(service.getUser).toBeCalled();
    });

    it('should throw an error if the user is not found', async () => {
      jest
        .spyOn(service, 'getUser')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.getUser({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('createUser', () => {
    it('should call UsersService createUser with the correct value', async () => {
      controller.createUser(createUserMock);

      expect(service.createUser).toBeCalledWith(createUserMock);
    });
  });

  describe('deleteUser', () => {
    it('should call UsersService deleteUser with the correct value', async () => {
      controller.deleteUser({ id: 1 });

      expect(service.deleteUser).toBeCalledWith({ id: 1 });
    });

    it('should throw an error if the user is not found', async () => {
      jest
        .spyOn(service, 'deleteUser')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () => await controller.deleteUser({ id: 0 }),
      ).rejects.toThrowError('There is no records found');
    });
  });

  describe('updateUser', () => {
    it('should call UsersService updateUser with the correct value', async () => {
      const user = controller.createUser(createUserMock);
      controller.updateUser({ id: 1 }, { ...user, email: 'a@test.com' });

      expect(service.updateUser).toBeCalledWith(
        { id: 1 },
        {
          ...user,
          email: 'a@test.com',
        },
      );
    });

    it('should throw an error if the user is not found', async () => {
      jest
        .spyOn(service, 'updateUser')
        .mockRejectedValue(new PrismaNotFoundException());

      expect(
        async () =>
          await controller.updateUser(
            { id: 0 },
            { ...createUserMock, email: 'a@test.com' },
          ),
      ).rejects.toThrowError('There is no records found');
    });
  });
});
