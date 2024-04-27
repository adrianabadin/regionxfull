"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorized = exports.JWTMissing = exports.IssuanceMissingId = exports.WrongPassword = exports.LoginCredentials = exports.UserDoesntExists = exports.UserExists = exports.AuthError = void 0;
class AuthError extends Error {
    constructor(errorContent, message = "Auth Error", code = "AUTH0") {
        super(message);
        this.errorContent = errorContent;
        this.code = code;
        this.name = "Auth Error";
        this.text = message;
    }
}
exports.AuthError = AuthError;
class UserExists extends AuthError {
    constructor(errorContent, message = "El usuario ya existe!", code = "AUTH01") {
        super(errorContent, message, code);
    }
}
exports.UserExists = UserExists;
class UserDoesntExists extends AuthError {
    constructor(errorContent, message = "El usuario no existe!", code = "AUTH02") {
        super(errorContent, message, code);
    }
}
exports.UserDoesntExists = UserDoesntExists;
class LoginCredentials extends AuthError {
    constructor(errorContent, message = "Falta usuario o contraseña", code = "AUTH03") {
        super(errorContent, message, code);
    }
}
exports.LoginCredentials = LoginCredentials;
class WrongPassword extends AuthError {
    constructor(errorContent, message = "Contraseña Incorrecta", code = "AUTH04") {
        super(errorContent, message, code);
    }
}
exports.WrongPassword = WrongPassword;
class IssuanceMissingId extends AuthError {
    constructor(errorContent, message = "Debes proveer un id para generar el token", code = "AUTH05") {
        super(errorContent, message, code);
    }
}
exports.IssuanceMissingId = IssuanceMissingId;
class JWTMissing extends AuthError {
    constructor(errorContent, message = "El payload del token esta vacio", code = "AUTH06") {
        super(errorContent, message, code);
    }
}
exports.JWTMissing = JWTMissing;
class UnAuthorized extends AuthError {
    constructor(errorContent, message = "El usuario no esta logueado", code = "AUTH07") {
        super(errorContent, message, code);
    }
}
exports.UnAuthorized = UnAuthorized;
