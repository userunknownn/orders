import { Injectable } from '@nestjs/common';
import { CreateUserRequest, UpdateUserRequest } from './dto/users.dto';
import { UserIdentification } from './types/user-identification.type';
import { User } from './types/user.type';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) { }

  async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async getById({ id }: UserIdentification): Promise<User> {
    return this.repository.findOne(Number(id));
  }

  async create(userInfo: CreateUserRequest): Promise<User> {
    return this.repository.create(
      this.formatUserToMatchDatabaseKeys(userInfo)
    );
  }

  async delete({ id }: UserIdentification): Promise<User> {
    return this.repository.delete(Number(id));
  }

  async update(
    { id }: UserIdentification,
    userInfo: UpdateUserRequest,
  ): Promise<User> {
    return this.repository.update(
      Number(id), this.formatUserToMatchDatabaseKeys(userInfo)
    );
  }

  private formatUserToMatchDatabaseKeys(unformattedUser: UpdateUserRequest) {
    return {
      first_name: unformattedUser.firstName,
      last_name: unformattedUser.lastName,
      document: unformattedUser.document,
      email: unformattedUser.email,
      phone_number: unformattedUser.phoneNumber,
      birth_date:
        unformattedUser.birthDate
          ? new Date(unformattedUser.birthDate)
          : undefined
    };
  }
}
