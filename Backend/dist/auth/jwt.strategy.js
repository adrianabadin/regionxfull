"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const auth_service_verify_1 = require("./auth.service.verify");
const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
passport_1.default.use('jwt', new passport_jwt_1.Strategy({ passReqToCallback: false,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "Gran tipo MILEI",
}, auth_service_verify_1.authServiceVerify.jwtVerify));
