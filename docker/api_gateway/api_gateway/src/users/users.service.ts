// import { HttpService } from '@nestjs/axios';
// import { AxiosResponse } from 'axios';
// import { lastValueFrom, Observable } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateUserRequest, UpdateUserRequest } from './dto/users.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserIdentification } from './types/user-identification.type';
import { User } from './types/user.type';
@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<User[]> {
    const { data } = await lastValueFrom(
      this.httpService.get(`http://users/users`),
    );

    return data;
  }

  async getUser({ id }: UserIdentification): Promise<User> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get(`http://users/users/${id}`),
      );

      return data;
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  async createUser(user: CreateUserRequest): Promise<User> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post(`http://users/users`, user),
      );

      return data;
    } catch (error) {
      throw new Error('User was not created');
    }
  }

  async deleteUser({ id }: UserIdentification): Promise<User> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.delete(`http://users/users/${id}`),
      );

      return data;
    } catch (error) {
      throw new UserNotFoundException();
    }
  }
  async updateUser(
    { id }: UserIdentification,
    user: UpdateUserRequest,
  ): Promise<User> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.patch(`http://users/users/${id}`, user),
      );

      return data;
    } catch (error) {
      throw new UserNotFoundException();
    }
  }
}
