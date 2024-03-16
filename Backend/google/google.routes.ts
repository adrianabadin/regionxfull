import { Router } from "express";
import { GoogleController } from "./google.controller";
import { validateSchemaMiddleware } from "../auth/auth.schema";
import { documentCreateSchema } from "./google.schemas";
const googleRoutes=Router()
const googleController=new GoogleController()
googleRoutes.post('/createDocument',validateSchemaMiddleware(documentCreateSchema),googleController.createDocument)
export default googleRoutes