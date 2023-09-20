import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const notFoundError: PrismaClientKnownRequestError = new PrismaClientKnownRequestError("no message", {
    code: 'P2025',
    clientVersion: '1',
});

export const constraintViolationError: PrismaClientKnownRequestError = new PrismaClientKnownRequestError("no message", {
    code: 'P2002',
    clientVersion: '1',
});