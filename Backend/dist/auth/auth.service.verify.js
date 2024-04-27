"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceVerify = exports.AuthVerifyModule = void 0;
const logger_1 = require("../Global.Services/logger");
const auth_service_1 = require("./auth.service");
const argon2_1 = __importDefault(require("argon2"));
const auth_errors_1 = require("./auth.errors");
const prisma_errors_1 = require("../prisma/prisma.errors");
class AuthVerifyModule {
    constructor() {
        this.service = new auth_service_1.AuthService();
        this.prisma = auth_service_1.prismaClient;
        this.signUpVerify = this.signUpVerify.bind(this);
        this.loginVerify = this.loginVerify.bind(this);
        this.jwtVerify = this.jwtVerify.bind(this);
    }
    signUpVerify(req, username, _password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.prisma.users.findUnique({ where: { username } });
                console.log(user, "debe ser undefined");
                if (user !== null) {
                    return done(new prisma_errors_1.UserExistError(), false);
                }
                const response = yield this.service.SignUpUser(req.body);
                if (response instanceof prisma_errors_1.PrismaError)
                    return done(new prisma_errors_1.CreateUserError(), false);
                if (response !== undefined)
                    return done(null, response);
                else
                    return done(new prisma_errors_1.CreateUserError(), false);
            }
            catch (err) {
                const error = (0, prisma_errors_1.returnPrismaError)(err);
                logger_1.logger.error({ function: "AuthVerifyModule.signUpVerify", error });
                return done(error, false);
            }
        });
    }
    loginVerify(username, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.users.findUnique({ where: { username } });
                console.log(user);
                if (user !== null) // si el usuario existe
                 {
                    if ((user === null || user === void 0 ? void 0 : user.hash) !== undefined && (yield argon2_1.default.verify(user.hash, password))) {
                        return done(null, user);
                    }
                    else
                        return done(new auth_errors_1.WrongPassword(), false);
                }
                else
                    return done(new auth_errors_1.UserDoesntExists(), false);
            }
            catch (err) {
                const error = (0, prisma_errors_1.returnPrismaError)(err);
                logger_1.logger.error({ function: "AuthVerifyModule.loginVerify", error });
                return done(error, false);
            }
        });
    }
    jwtVerify(payload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = null;
                if (payload === undefined)
                    return done(new auth_errors_1.JWTMissing(), false);
                user = yield this.prisma.users.findUnique({ where: { id: payload.id } });
                if (user === null)
                    return done(new auth_errors_1.UserDoesntExists(), false);
                if (user instanceof prisma_errors_1.PrismaError)
                    return done(user, false);
                else
                    return done(null, user);
            }
            catch (err) {
                return done(err, false);
            }
        });
    }
}
exports.AuthVerifyModule = AuthVerifyModule;
exports.authServiceVerify = new AuthVerifyModule();
