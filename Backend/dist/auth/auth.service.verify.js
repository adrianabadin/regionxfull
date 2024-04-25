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
exports.AuthVerifyModule = void 0;
const logger_1 = require("../Global.Services/logger");
const auth_service_1 = require("./auth.service");
const argon2_1 = __importDefault(require("argon2"));
class AuthVerifyModule {
    constructor() {
        this.service = new auth_service_1.AuthService();
        this.prisma = auth_service_1.prismaClient;
        this.signUpVerify = this.signUpVerify.bind(this);
        this.loginVerify = this.loginVerify.bind(this);
    }
    signUpVerify(req, username, _password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.prisma.users.findUnique({ where: { username } });
                console.log(user, "debe ser undefined");
                if (user !== null) {
                    throw new Error("username already exists");
                }
                const response = yield this.service.SignUpUser(req.body);
                if (response !== undefined)
                    done(null, response);
                else
                    throw new Error("Error creating user on database");
            }
            catch (error) {
                logger_1.logger.error({ function: "AuthVerifyModule.signUpVerify", error });
                done(error, false);
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
                        done(null, user);
                    }
                    else
                        throw new Error("Password is incorrect");
                }
                else
                    throw new Error("User doesnt exists");
            }
            catch (error) {
                logger_1.logger.error({ function: "AuthVerifyModule.loginVerify", error });
                done(error, false);
            }
        });
    }
}
exports.AuthVerifyModule = AuthVerifyModule;
