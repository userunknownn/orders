import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { PrismaClient } from '@prisma/client';
import { createUserMock, updateUserMock } from './mock/users.mock';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    prisma = new PrismaClient();
    await prisma.user.deleteMany();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/users (GET)', () => {
    it('should return empty when there is no user', async () => {
      await request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([]);
    });

    it('should return the users list, when users are registered', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      await request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([response.body]);
    });
  });

  describe('/users (POST)', () => {
    it('should create a new user', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock)
        .expect(201);
    });

    it('should not create a user with the same email', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock)
        .expect(409);
    })
  });

  describe('/users/:id (GET)', () => {
    it('should return the user with that id', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      await request(app.getHttpServer())
        .get(`/users/${response.body.user_id}`)
        .expect(200);
    });

    it('should return 404 if there is no user with that id', async () => {
      await request(app.getHttpServer())
        .get('/users/0')
        .expect(404);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete the user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      await request(app.getHttpServer())
        .delete(`/users/${response.body.user_id}`)
        .expect(200);
    });

    it('should return status 404 as the user does not exists', async () => {
      await request(app.getHttpServer())
        .delete('/users/0')
        .expect(404);
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should update an existing user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      await request(app.getHttpServer())
        .patch(`/users/${response.body.user_id}`)
        .send(updateUserMock)
        .expect(200);
    });

    it('should return status 404 as the user does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/users/0')
        .send(updateUserMock)
        .expect(404);
    });
  });
});
