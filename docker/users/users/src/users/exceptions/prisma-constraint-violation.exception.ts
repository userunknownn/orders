import { HttpException } from '@nestjs/common';

export class PrismaConstraintViolationException extends HttpException {
  constructor() {
    super('There is a Prisma Constraint Violation', 409);
  }
}
