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
exports.UsersController = void 0;
const auth_service_1 = require("../auth/auth.service");
const logger_1 = require("../Global.Services/logger");
const users_service_1 = require("./users.service");
const usersService = new users_service_1.UsersService();
class UsersController {
    constructor(prisma = auth_service_1.prismaClient, service = usersService) {
        this.prisma = prisma;
        this.service = service;
        this.setAdmin = this.setAdmin.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
        this.addDepartments = this.addDepartments.bind(this);
    }
    setAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.query, "query");
                const response = yield this.service.setAdmin(req.params.id);
                res.status(200).send(response);
            }
            catch (error) {
                logger_1.logger.error({ function: "UsersController.setAdmin", error });
                res.status(500).send({ error });
            }
        });
    }
    addDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.service.addDepartment(req.params.id, req.query.name);
                res.status(200).send(response);
            }
            catch (error) {
                logger_1.logger.error({ function: "UsersController.addDepartment", error });
                res.status(500).send({ error });
            }
        });
    }
    addDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.service.addDepartments(req.params.id, req.query.name);
                res.status(200).send(response);
            }
            catch (error) {
                logger_1.logger.error({ function: "UsersController.addDepartments", error });
                res.status(500).send({ error });
            }
        });
    }
}
exports.UsersController = UsersController;
