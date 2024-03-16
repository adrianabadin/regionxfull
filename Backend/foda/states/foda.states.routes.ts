import { Router } from "express";
import { fodaStateController } from "./foda.states.controller";
import { validateSchemaMiddleware } from "../../auth/auth.schema";
import { fodaStateSchema, removeMemberSchema } from './foda.states.schema';
export const fodaStateRouter = Router()

fodaStateRouter.post("/",fodaStateController.create)
fodaStateRouter.put("/",validateSchemaMiddleware(fodaStateSchema),fodaStateController.update)
fodaStateRouter.get("/byState",fodaStateController.getByState)
fodaStateRouter.get("/byStateHistory",fodaStateController.getAllFODAByStateHistory)
fodaStateRouter.delete("/",validateSchemaMiddleware(removeMemberSchema),fodaStateController.removeMember)
