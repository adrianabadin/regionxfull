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
//@ts-nocheck
const vitest_1 = require("vitest");
const auth_service_1 = require("../../auth/auth.service");
const users_service_1 = require("../users.service");
const uuid_1 = require("uuid");
const usersService = new users_service_1.UsersService();
const updateSpy = vitest_1.vi.spyOn(auth_service_1.prismaClient.users, "update");
const userReturn = { createdAt: new Date(), updatedAt: new Date(), hash: "texto", id: "bhbhbh", isAdmin: true, lastname: "adrian", name: "abadin", phone: "888888", username: "aabadin@gmail.com" };
(0, vitest_1.describe)("UsersService Tests", () => {
    (0, vitest_1.describe)("setAdmin", () => {
        // afterEach(()=>{vi.resetAllMocks()})
        (0, vitest_1.beforeEach)(() => {
            vitest_1.vi.resetAllMocks();
            updateSpy.mockResolvedValue(userReturn);
        });
        (0, vitest_1.it)("Should call update when id parameter is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.setAdmin((0, uuid_1.v4)());
            (0, vitest_1.expect)(updateSpy).toBeCalled();
            (0, vitest_1.expect)(response).toBe(userReturn);
        }));
        (0, vitest_1.it)("Should return undefined if ID is not provided and never call update", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.setAdmin();
            (0, vitest_1.expect)(updateSpy).not.toBeCalled();
            (0, vitest_1.expect)(response).toBe(undefined);
        }));
    });
    (0, vitest_1.describe)("addDepartment", () => {
        //   beforeEach(()=>{vi.resetAllMocks()})
        (0, vitest_1.beforeEach)(() => {
            vitest_1.vi.resetAllMocks();
            updateSpy.mockResolvedValue(userReturn);
        });
        //updateSpy.mockResolvedValue(userReturn as any)
        (0, vitest_1.it)("Should call update if userID is provided and a departmentName is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.addDepartment((0, uuid_1.v4)(), (0, uuid_1.v4)());
            (0, vitest_1.expect)(updateSpy).toBeCalled();
            (0, vitest_1.expect)(updateSpy).toReturnWith(userReturn);
            (0, vitest_1.expect)(response).toBe(userReturn);
        }));
        (0, vitest_1.it)("Should return undefined and never get to call update if either param is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield usersService.addDepartment(undefined, (0, uuid_1.v4)());
            (0, vitest_1.expect)(updateSpy).not.toBeCalled();
            (0, vitest_1.expect)(response).toBe(undefined);
            response = yield usersService.addDepartment((0, uuid_1.v4)());
            (0, vitest_1.expect)(updateSpy).not.toBeCalled();
            (0, vitest_1.expect)(response).toBe(undefined);
        }));
    });
    (0, vitest_1.describe)("addDepartments", () => {
        (0, vitest_1.beforeEach)(() => {
            vitest_1.vi.resetAllMocks();
            updateSpy.mockResolvedValue(userReturn);
        });
        (0, vitest_1.it)("it should call update if an uuid is provided  and a array of strings", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.addDepartments((0, uuid_1.v4)(), [(0, uuid_1.v4)()]);
            (0, vitest_1.expect)(updateSpy).toBeCalled();
            (0, vitest_1.expect)(response).toBe(userReturn);
        }));
        (0, vitest_1.it)("Should not call updateSpy if a single string is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.addDepartments((0, uuid_1.v4)(), (0, uuid_1.v4)());
            (0, vitest_1.expect)(updateSpy).not.toBeCalled();
            (0, vitest_1.expect)(response).toBe(undefined);
        }));
        (0, vitest_1.it)("Should not call update if id UUID is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.addDepartments(undefined, [(0, uuid_1.v4)()]);
            (0, vitest_1.expect)(updateSpy).not.toBeCalled();
            (0, vitest_1.expect)(response).toBe(undefined);
        }));
        (0, vitest_1.it)("Should not call update and return undefined if an array of strings is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield usersService.addDepartments((0, uuid_1.v4)());
            (0, vitest_1.expect)(updateSpy).not.toBeCalled();
            (0, vitest_1.expect)(response).toBe(undefined);
        }));
    });
});
