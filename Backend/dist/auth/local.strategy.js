"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStrategy = exports.signUpStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const auth_service_verify_1 = require("./auth.service.verify");
const authVerify = new auth_service_verify_1.AuthVerifyModule();
exports.signUpStrategy = new passport_local_1.Strategy({ passReqToCallback: true }, authVerify.signUpVerify);
exports.loginStrategy = new passport_local_1.Strategy(authVerify.loginVerify);
passport_1.default.use('register', exports.signUpStrategy);
passport_1.default.use("login", exports.loginStrategy);
