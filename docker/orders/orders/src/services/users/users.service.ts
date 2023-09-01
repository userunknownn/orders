import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';
import { User } from './types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  async getUser(id: number): Promise<User> {
    return this.httpService.makeHttpRequest(`http://users:3000/users/${id}`);
  }
}
