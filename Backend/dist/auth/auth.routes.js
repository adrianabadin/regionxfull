"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
const auth_schema_1 = require("./auth.schema");
exports.authRoutes = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
exports.authRoutes.post("/signup", (req, res, next) => {
    console.log(req.body, "texto", req.headers, req);
    next();
}, (0, auth_schema_1.validateSchemaMiddleware)(auth_schema_1.SignUpSchema), passport_1.default.authenticate("register", { failureRedirect: "/login" }), (req, res) => { console.log(req.user); res.status(200).send(req.user); });
exports.authRoutes.post("/login", (0, auth_schema_1.validateSchemaMiddleware)(auth_schema_1.LoginSchema), passport_1.default.authenticate("login", { failureRedirect: "/login" }), (req, res) => {
    console.log(req.user, "hizo login");
    // req.session.save()
    // req.headers["access-control-allow-credentials"]="true"
    res.status(200).send(req.user);
});
exports.authRoutes.get("/logout", (req, res, next) => {
    req.logout((error) => {
        if (error)
            next(error);
        res.status(200).send("Loged out");
    });
});
exports.default = exports.authRoutes;
//(req:Request,res:Response,next:NextFunction)=>{res.status(200).send(req.body)},
