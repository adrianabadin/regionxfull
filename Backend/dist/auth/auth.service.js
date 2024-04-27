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
exports.AuthService = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const auth_schema_1 = require("./auth.schema");
const logger_1 = require("../Global.Services/logger");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_errors_1 = require("../prisma/prisma.errors");
const auth_errors_1 = require("./auth.errors");
exports.prismaClient = new client_1.PrismaClient();
class AuthService {
    constructor() {
        this.prisma = exports.prismaClient;
        this.SignUpUser = this.SignUpUser.bind(this);
        this.jwtIssuance = this.jwtIssuance.bind(this);
    }
    SignUpUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedSchema = auth_schema_1.SignUpSchema.shape.body;
                const result = parsedSchema.safeParse(data);
                if (!result.success)
                    throw new Error("Los datos enviados no validan SignUpType");
                const hash = yield argon2_1.default.hash(data.password);
                const dataWithHash = {
                    hash, lastname: data.lastname, name: data.name, username: data.username
                };
                const response = yield this.prisma.users.create({ data: dataWithHash });
                console.log(response);
                return response;
            }
            catch (err) {
                const error = (0, prisma_errors_1.returnPrismaError)(err);
                logger_1.logger.error({ function: "AuthService.SignUpUser", error });
                return error;
            }
        });
    }
    jwtIssuance(id) {
        if (id === undefined)
            return new auth_errors_1.IssuanceMissingId();
        return jsonwebtoken_1.default.sign({ id, date: new Date() }, "Gran tipo MILEI", { expiresIn: 600 });
    }
}
exports.AuthService = AuthService;
