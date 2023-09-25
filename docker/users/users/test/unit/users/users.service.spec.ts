import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaNotFoundException } from '../../../src/users/exceptions/prisma-not-found.exception';
import { UsersRepository } from '../../../src/users/users.repository';
import { UsersService } from '../../../src/users/users.service';
import {
  createdUserMock,
  createUserMock,
  formattedUserMock,
  updateUserMock,
} from './mock/users.mock';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: UsersRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(createdUserMock),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        PrismaClient,
      ],
    }).compile();

    service = app.get<UsersService>(UsersService);
    repository = app.get<UsersRepository>(UsersRepository);
  });

  describe('getAll', () => {
    it('should return get the users list', async () => {
      jest.spyOn(repository, 'findAll').mockImplementationOnce(async () => []);

      const users = await service.getAll();

      expect(users).toStrictEqual([]);
    });
  });

  describe('getById', () => {
    it('should return just a user from the repository', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => createdUserMock);

      const user = await service.getById({ id: 1 });

      expect(user).toStrictEqual(createdUserMock);
    });

    it('should throw an error if the user is not found', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(async () => await service.getById({ id: 0 })).rejects.toThrowError(
        'There is no records found',
      );
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest
        .spyOn(repository, 'findAll')
        .mockImplementationOnce(async () => [createdUserMock]);

      await service.create(createUserMock);
      const users = await service.getAll();

      expect(users).toStrictEqual([createdUserMock]);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      await service.delete({ id: 1 });

      expect(repository.delete).toBeCalled();
    });

    it('should throw an error if the user is not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(async () => {
        await service.delete({ id: 0 });
      }).rejects.toThrowError('There is no records found');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      await service.update(
        {
          id: 1,
        },
        updateUserMock,
      );

      expect(repository.update).toBeCalledWith(1, formattedUserMock);
    });

    it('should throw an error if the user does not exists', () => {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValueOnce(new PrismaNotFoundException());

      expect(
        async () => await service.update({ id: 0 }, updateUserMock),
      ).rejects.toThrowError('There is no records found');
    });
  });
});
