import { Router } from "express";
import { validateSchemaMiddleware } from "../auth/auth.schema";
import { departmentSchema, departmentsSchema, setAdminSchema } from "./users.schema";
import { UsersController } from './users.controller';
const usersController=new UsersController()
const userRouter=Router()
userRouter.get("/setadmin/:id",validateSchemaMiddleware(setAdminSchema),usersController.setAdmin)
userRouter.get("/addDepartment/:id",validateSchemaMiddleware(departmentSchema),usersController.addDepartment)
userRouter.get("/addDepartments/:id",validateSchemaMiddleware(departmentsSchema),usersController.addDepartments)
export default userRouter