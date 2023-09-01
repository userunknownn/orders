import { HttpException } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', 404);
  }
}
