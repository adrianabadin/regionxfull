import { Request, Response } from "express";
import { logger } from "../Global.Services/logger";
import { DeparmentService } from './deparment.service';
import { departmentCreateType } from "./department.schema";
const departmentService=new DeparmentService()
export class DeparmentController{
    constructor(protected service = departmentService){
        this.createDepartment=this.createDepartment.bind(this);
this.getDepartments=this.getDepartments.bind(this);
    }
    async createDepartment(req:Request<any,any,departmentCreateType["body"]>,res:Response){
        try{
            const response = await this.service.createDepartment(req.body)
            res.status(200).send(response)
        }
        catch(error){
            logger.error({function:"DeparmentController.createDepartment",error})
            res.status(500).send(error)
        }
    }
    async getDepartments(_req:Request,res:Response){
        try{
            const response = await this.service.getDepartments()
            res.status(200).send(response)
        }catch(error){
            logger.error({function:"DeparmentController.getDepartments",error})
            res.status(500).send(error)
        }
    }
}