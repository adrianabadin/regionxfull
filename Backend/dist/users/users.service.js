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
exports.UsersService = void 0;
const logger_1 = require("../Global.Services/logger");
const auth_service_1 = require("../auth/auth.service");
const users_schema_1 = require("./users.schema");
class UsersService {
    constructor(prisma = auth_service_1.prismaClient) {
        this.prisma = prisma;
        this.setAdmin = this.setAdmin.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
        this.addDepartments = this.addDepartments.bind(this);
    }
    setAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = users_schema_1.setAdminSchema.shape.params.safeParse({ id });
                if (result.success) {
                    const response = yield this.prisma.users.update({ where: { id }, data: { isAdmin: true } });
                    return response;
                }
                else
                    throw new Error(result.error.issues[0].message);
            }
            catch (error) {
                logger_1.logger.error({ function: "UsersService.updateUser", error });
            }
        });
    }
    addDepartment(id, departmentName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                users_schema_1.departmentSchema.parse({ query: { name: departmentName } });
                users_schema_1.setAdminSchema.parse({ params: { id } });
                const response = yield this.prisma.users.update({ where: { id }, data: { departments: { connect: { name: departmentName } } } });
                return response;
            }
            catch (error) {
                {
                    logger_1.logger.error({ function: "UsersService.addDepartment", error });
                }
            }
        });
    }
    addDepartments(id, departmentArray) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                users_schema_1.departmentsSchema.parse({ query: { name: departmentArray } });
                users_schema_1.setAdminSchema.parse({ params: { id } });
                const response = yield this.prisma.users.update({ where: { id }, data: { departments: { connect: departmentArray.map(name => ({ name })) } } });
                return response;
            }
            catch (error) {
                {
                    logger_1.logger.error({ function: "UsersService.addDepartments", error });
                }
            }
        });
    }
}
exports.UsersService = UsersService;
