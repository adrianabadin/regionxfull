"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_schema_1 = require("../auth/auth.schema");
const users_schema_1 = require("./users.schema");
const users_controller_1 = require("./users.controller");
const usersController = new users_controller_1.UsersController();
const userRouter = (0, express_1.Router)();
userRouter.get("/setadmin/:id", (0, auth_schema_1.validateSchemaMiddleware)(users_schema_1.setAdminSchema), usersController.setAdmin);
userRouter.get("/addDepartment/:id", (0, auth_schema_1.validateSchemaMiddleware)(users_schema_1.departmentSchema), usersController.addDepartment);
userRouter.get("/addDepartments/:id", (0, auth_schema_1.validateSchemaMiddleware)(users_schema_1.departmentsSchema), usersController.addDepartments);
exports.default = userRouter;