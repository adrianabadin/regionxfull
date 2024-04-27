"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistError = exports.CreateUserError = exports.CreateManyNotArray = exports.HashCreationError = exports.UnknownPrismaError = exports.returnPrismaError = exports.isPrismaError = exports.isTimeout = exports.TimeoutOrConnectionError = exports.NotFoundError = exports.DuplicateIdentifierConstraintError = exports.duplicateError = exports.notFound = exports.PrismaError = void 0;
class PrismaError extends Error {
    constructor(message, code, errorContent) {
        super(message);
        this.text = message;
        this.code = code;
        this.errorContent = errorContent;
        this.name = "Prisma Error";
    }
}
exports.PrismaError = PrismaError;
function notFound(error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
        return new NotFoundError();
    }
}
exports.notFound = notFound;
function duplicateError(error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
        return new DuplicateIdentifierConstraintError(error);
    }
}
exports.duplicateError = duplicateError;
class DuplicateIdentifierConstraintError extends PrismaError {
    constructor(errorContent, message = "La solicitud viola una limitacion de unicidad en el modelo", code = "P2002") {
        super(message, code, errorContent);
        this.name = "Duplicate Identifier Constraint";
    }
}
exports.DuplicateIdentifierConstraintError = DuplicateIdentifierConstraintError;
class NotFoundError extends PrismaError {
    constructor(errorContent, message = "El registro solicitado no existe", code = "P2025") {
        super(message, code, errorContent);
        this.name = "Not Found Error";
    }
}
exports.NotFoundError = NotFoundError;
class TimeoutOrConnectionError extends PrismaError {
    constructor(errorContent, message = "Paso el tiempo de conexion o hay demasiadas conexiones a la base de datos", code = "P2024") {
        super(message, code, errorContent);
        this.name = "Timeout Or Connection Error";
    }
}
exports.TimeoutOrConnectionError = TimeoutOrConnectionError;
function isTimeout(error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2024") {
        return new TimeoutOrConnectionError(error);
    }
}
exports.isTimeout = isTimeout;
function isPrismaError(error) {
    if (error instanceof PrismaError)
        return error;
}
exports.isPrismaError = isPrismaError;
function returnPrismaError(error) {
    return isTimeout(error) || notFound(error) || duplicateError(error) || isPrismaError(error) || new UnknownPrismaError(error);
}
exports.returnPrismaError = returnPrismaError;
class UnknownPrismaError extends PrismaError {
    constructor(errorContent, message = "Error desconocido de la base de datos", code = "PX") {
        super(message, code, errorContent);
        this.name = "Unknown Prisma Error";
    }
}
exports.UnknownPrismaError = UnknownPrismaError;
class HashCreationError extends PrismaError {
    constructor(errorContent, message = "Faltan argumentos para crear el hash", code = "PHASH") {
        super(message, code, errorContent);
        this.name = "Hash Creation Error";
    }
}
exports.HashCreationError = HashCreationError;
class CreateManyNotArray extends PrismaError {
    constructor(errorContent, message = "Debes proveer un array de datos", code = "PNOTARRAY") {
        super(message, code, errorContent);
        this.name = "Create Many Not Arrray Error";
    }
}
exports.CreateManyNotArray = CreateManyNotArray;
class CreateUserError extends PrismaError {
    constructor(errorContent, message = "Error al crear el usuario", code = "UsrCreateErr1") {
        super(message, code, errorContent);
        this.name = "Create User Error";
    }
}
exports.CreateUserError = CreateUserError;
class UserExistError extends PrismaError {
    constructor(errorContent, message = "El usuario ya existe", code = "UsrCreateErr2") {
        super(message, code, errorContent);
        this.name = "Create User Exist Error";
    }
}
exports.UserExistError = UserExistError;
