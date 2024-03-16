import { Router } from "express";
import { fodaServicesController } from "./foda.services.controller";
import { validateSchemaMiddleware } from "../../auth/auth.schema";
import { fodaServiceSchema, removeMemberSchema } from './foda.services.schema';
export const fodaServiceRouter = Router()

fodaServiceRouter.post("/",fodaServicesController.create)
fodaServiceRouter.put("/",validateSchemaMiddleware(fodaServiceSchema),fodaServicesController.update)
fodaServiceRouter.get("/byService",fodaServicesController.getByState)
fodaServiceRouter.get("/byServiceHistory",fodaServicesController.getAllFODAByState)
fodaServiceRouter.delete("/",validateSchemaMiddleware(removeMemberSchema),fodaServicesController.removeMember)
