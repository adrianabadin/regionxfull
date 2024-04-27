"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth/auth.controller");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
require("./auth/local.strategy");
require("./auth/jwt.strategy");
const user_routes_1 = __importDefault(require("./users/user.routes"));
const zod_1 = require("zod");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authController = new auth_controller_1.AuthController();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://66.97.47.206:3000', 'http://66.97.47.206'],
    credentials: true,
    preflightContinue: true
}));
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url({ message: "Debes proveer un url de la base de datos" }),
    ENVIROMENT: zod_1.z.enum(["DEV", "PRODUCTION"], { invalid_type_error: "ENVIROMENT debe ser DEV o PRODUCTION" }),
    LOGS: zod_1.z.string().min(1, { message: "Debes proveer la ruta de los logs" }),
    PORT: zod_1.z.string().refine(value => {
        const parsedNumber = parseInt(value);
        if (isNaN(parsedNumber))
            return false;
        else
            return true;
    }, { message: "PORT debe ser un string de numero" })
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
// const store = new PrismaSessionStore(new PrismaClient(), {
//   checkPeriod: 2 * 60 * 1000, // ms
//   dbRecordIdIsSessionId: true,
//   dbRecordIdFunction: undefined,
//   ttl: 60 * 60 * 1000
// })
// const sessionMiddleware = Session({
//   store,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { sameSite: 'lax' ,secure:false,maxAge:60*60*1000},
//   name:'session-data',
//   secret: 'Dilated flakes of fire fall, like snow in the Alps when there is no wind'
// })
app.use((0, cookie_parser_1.default)()); // "Whether 'tis nobler in the mind to suffer"
// app.use(sessionMiddleware)
app.use(passport_1.default.initialize());
//app.use(passport.session())
exports.default = app;
passport_1.default.serializeUser(authController.serialize);
passport_1.default.deserializeUser(authController.deSerialize);
app.use("/auth", auth_routes_1.default);
app.use("/users", user_routes_1.default);
//routeHandler(app)
