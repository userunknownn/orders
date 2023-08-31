import { Injectable } from '@nestjs/common';
import { CreateUserRequest, UpdateUserRequest } from './dto/users.dto';
import { UserIdentification } from './types/user-identification.type';
import { User } from './types/user.type';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  private users = [];

  async getUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  async getUser({ id }: UserIdentification): Promise<User> {
    return this.repository.findOne(Number(id));
  }

  async createUser(userInfo: CreateUserRequest): Promise<User> {
    return this.repository.create({
      ...this.formatUserToMatchDatabaseKeys(userInfo),
    });
  }

  async deleteUser({ id }: UserIdentification): Promise<User> {
    return this.repository.delete(Number(id));
  }

  async updateUser(
    { id }: UserIdentification,
    userInfo: UpdateUserRequest,
  ): Promise<User> {
    return this.repository.update(Number(id), {
      ...this.formatUserToMatchDatabaseKeys(userInfo),
    });
  }

  private formatUserToMatchDatabaseKeys(unformattedUser: UpdateUserRequest) {
    return {
      first_name: unformattedUser.firstName,
      last_name: unformattedUser.lastName,
      document: unformattedUser.document,
      email: unformattedUser.email,
      phone_number: unformattedUser.phoneNumber,
      birth_date:
        unformattedUser.birthDate == undefined
          ? undefined
          : new Date(unformattedUser.birthDate),
    };
  }
}
