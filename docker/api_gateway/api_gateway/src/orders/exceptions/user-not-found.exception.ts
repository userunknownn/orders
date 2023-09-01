import { HttpException } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('No user was found with this user_id', 404);
  }
}
