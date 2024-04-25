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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const logger_1 = require("../Global.Services/logger");
//NO SIRVE
class AuthController {
    constructor(prisma = auth_service_1.prismaClient) {
        this.prisma = prisma;
        this.service = new auth_service_1.AuthService();
        this.serialize = (user, done) => {
            done(null, user.id);
        };
        this.deSerialize = (userId, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.users.findUnique({ where: { id: userId } });
                if (response !== null) {
                    return done(null, response);
                }
            }
            catch (error) {
                logger_1.logger.error({ function: 'AuthService.deSerialize', error });
            }
        });
    }
    SignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.service.SignUpUser(req.body);
                res.status(200).send(response);
            }
            catch (error) {
                logger_1.logger.error({ function: "AuthController.SignUp", error });
                res.status(400).send(error);
            }
        });
    }
}
exports.AuthController = AuthController;
