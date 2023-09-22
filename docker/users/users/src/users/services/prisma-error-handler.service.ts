import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrors } from '../enum/prisma-errors.enum';
import { PrismaConstraintViolationException } from '../exceptions/prisma-constraint-violation.exception';
import { PrismaNotFoundException } from '../exceptions/prisma-not-found.exception';

@Injectable()
export class PrismaErrorHandler {

    isPrimaError(error: Error): boolean {
        return error instanceof PrismaClientKnownRequestError;
    }

    handleError(error: PrismaClientKnownRequestError): void {
        switch (error.code) {
            case (PrismaErrors.NOT_FOUND): throw new PrismaNotFoundException();
            case (PrismaErrors.CONSTRAINT_VIOLATION): throw new PrismaConstraintViolationException();
        }
    }
};