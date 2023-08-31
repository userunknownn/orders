import { HttpException } from '@nestjs/common';

export class PrismaNotFoundException extends HttpException {
  constructor() {
    super('There is no records found', 404);
  }
}
