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
//@ts-nocheck
const vitest_1 = require("vitest");
const auth_service_1 = require("../auth.service");
const auth_service_verify_1 = require("../auth.service.verify");
const argon2_1 = __importDefault(require("argon2"));
vitest_1.vi.clearAllMocks();
const authVerify = new auth_service_verify_1.AuthVerifyModule();
const createReturn = { hash: "tefsfw", username: "aabadin@gmail.com", lastname: "Abadin", name: "Adrian", id: "texto" };
const findUniqueSpy = vitest_1.vi.spyOn(auth_service_1.prismaClient.users, "findUnique");
const argonSpy = vitest_1.vi.spyOn(argon2_1.default, "verify");
const createSpy = vitest_1.vi.spyOn(auth_service_1.prismaClient.users, "create");
(0, vitest_1.describe)("AuthVerifyModule", () => {
    (0, vitest_1.describe)(".SignUpUser", () => {
        (0, vitest_1.beforeEach)(() => { vitest_1.vi.resetAllMocks(); });
        const doneSpy = vitest_1.vi.fn();
        (0, vitest_1.it)("should call findUnique and create if params are provided and return a UsersCreteInput Type", () => __awaiter(void 0, void 0, void 0, function* () {
            findUniqueSpy.mockResolvedValue(null);
            createSpy.mockResolvedValue(createReturn);
            yield authVerify.signUpVerify({ body: { lastname: "adrian", name: "adrian", password: "qwedsaqw", username: "aabadin@gmail.com" } }, "adrian@ddd.com", "qwedsazxc", doneSpy);
            (0, vitest_1.expect)(findUniqueSpy).toBeCalled();
            (0, vitest_1.expect)(findUniqueSpy).toReturnWith(null);
            (0, vitest_1.expect)(createSpy).toBeCalled();
            (0, vitest_1.expect)(doneSpy).toBeCalled();
            //expect(doneSpy).toBeCalledWith(null,createReturn)
        }));
        (0, vitest_1.it)("Should not call create if findUnique returns a value and done is called with (error,false)", () => __awaiter(void 0, void 0, void 0, function* () {
            findUniqueSpy.mockImplementation(() => Promise.resolve(createReturn));
            const res = yield authVerify.signUpVerify({ body: { lastname: "adrian", name: "adrian", password: "qwedsaqw", username: "aabadin@gmail.com" } }, "adrian@ddd.com", "qwedsazxc", doneSpy);
            (0, vitest_1.expect)(findUniqueSpy).toBeCalled();
            (0, vitest_1.expect)(createSpy).not.toBeCalled();
            (0, vitest_1.expect)(doneSpy).toBeCalledWith(new Error("username already exists"), false);
        }));
        (0, vitest_1.it)("Should break if body is undefined", () => __awaiter(void 0, void 0, void 0, function* () {
            findUniqueSpy.mockResolvedValue(null);
            const res = yield authVerify.signUpVerify(undefined, undefined, undefined, doneSpy);
            console.log(res);
            (0, vitest_1.expect)(findUniqueSpy).toBeCalled();
            (0, vitest_1.expect)(findUniqueSpy).toReturnWith(null);
            (0, vitest_1.expect)(createSpy).not.toBeCalled();
            (0, vitest_1.expect)(doneSpy).toBeCalledWith(new TypeError("Cannot read properties of undefined (reading 'body')"), false);
        }));
    });
    (0, vitest_1.describe)("loginVerify", () => {
        (0, vitest_1.afterEach)(() => { vitest_1.vi.resetAllMocks(); });
        const doneSpy = vitest_1.vi.fn();
        (0, vitest_1.it)("Should call argon if findUnique returns a value and call done (null,User)", () => __awaiter(void 0, void 0, void 0, function* () {
            findUniqueSpy.mockResolvedValue(createReturn);
            argonSpy.mockResolvedValue(true);
            yield authVerify.loginVerify("Adrian", "123456", doneSpy);
            (0, vitest_1.expect)(findUniqueSpy).toBeCalled();
            (0, vitest_1.expect)(argonSpy).toBeCalled;
            (0, vitest_1.expect)(doneSpy).toBeCalledWith(null, createReturn);
        }));
        (0, vitest_1.it)("Should call argon and call done(error,false) when argon returns false", () => __awaiter(void 0, void 0, void 0, function* () {
            findUniqueSpy.mockResolvedValue(createReturn);
            argonSpy.mockResolvedValue(false);
            yield authVerify.loginVerify("Adrian", "123456", doneSpy);
            (0, vitest_1.expect)(findUniqueSpy).toBeCalled();
            (0, vitest_1.expect)(argonSpy).toBeCalled();
            (0, vitest_1.expect)(doneSpy).toBeCalledWith(new Error("Password is incorrect"), false);
        }));
        (0, vitest_1.it)("Should call argon and call done(error,false) when findUnique returns undefined", () => __awaiter(void 0, void 0, void 0, function* () {
            findUniqueSpy.mockResolvedValue(null);
            argonSpy.mockResolvedValue(false);
            yield authVerify.loginVerify("Adrian", "123456", doneSpy);
            (0, vitest_1.expect)(findUniqueSpy).toBeCalled();
            (0, vitest_1.expect)(argonSpy).not.toBeCalled();
            (0, vitest_1.expect)(doneSpy).toBeCalledWith(new Error("User doesnt exists"), false);
        }));
    });
});
