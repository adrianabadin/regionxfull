import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { logger } from "../Global.Services/logger";
import { TaskType } from './task.schema';
const taskService= new TaskService()

export class TaskController{

    constructor(protected service = taskService){
        this.createTask=this.createTask.bind(this)
        this.getTasksByDepartment=this.getTasksByDepartment.bind(this)
    }
    async createTask (req:Request<any,any,TaskType>,res:Response){
        try{
        const response = await this.service.createTask(req.body)
        res.status(200).send(response)
        }catch(error){
            logger.error({function:"TaskController.createTask",error})
            res.status(500).send(error)
        }
    }
    async getTasksByDepartment(req:Request<any,any,any,{department:string}>,res:Response){
        try{
            const {department}=req.query
            const response = await this.service.getTasksByDepartment(department)
            res.status(200).send(response)
        }catch(error){
            logger.error({function:"TaskController.getTasks",error})
            res.status(500).send(error)
        }
    }
}