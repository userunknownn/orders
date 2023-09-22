import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConstraintViolationException } from '../../../../src/users/exceptions/prisma-constraint-violation.exception';
import { PrismaNotFoundException } from '../../../../src/users/exceptions/prisma-not-found.exception';
import { PrismaErrorHandler } from '../../../../src/users/services/prisma-error-handler.service';
import { constraintViolationError, notFoundError } from './mock/prisma-error-handler.mock';


describe('PrismaErrorHandlerService', () => {
    let service: PrismaErrorHandler;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                PrismaErrorHandler
            ],
        }).compile();

        service = app.get<PrismaErrorHandler>(PrismaErrorHandler);
    });

    describe("isPrismaError", () => {
        it("should return true when the error is instance of PrismaClientKnownRequestError", () => {
            expect(service.isPrimaError(notFoundError)).toBe(true);
        });

        it("should return false when the error is not a Prisma error", () => {
            expect(service.isPrimaError(new Error)).toBe(false)
        });
    })

    describe("handleError", () => {
        it('Error code P2025 should throw not found exception', () => {
            expect(() => service.handleError(notFoundError))
                .toThrow(PrismaNotFoundException);
        });

        it('Error code P2002 should throw constraint violation exception', () => {
            expect(() => service.handleError(constraintViolationError))
                .toThrow(PrismaConstraintViolationException);
        })
    });

});
