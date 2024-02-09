import { Request, Response } from "express";
import { prismaClient } from "../auth/auth.service";
import { DepartmentType, DepartmentsType, SetAdminType, setAdminSchema } from "./users.schema";
import { error } from 'console';
import { logger } from "../Global.Services/logger";
import { UsersService } from "./users.service";
const usersService=new UsersService()
export class UsersController{
constructor(protected prisma=prismaClient,protected service=usersService){
    this.setAdmin=this.setAdmin.bind(this)
    this.dropAdmin=this.dropAdmin.bind(this)
    this.addDepartment=this.addDepartment.bind(this)
    this.addDepartments=this.addDepartments.bind(this)
    this.getUsers=this.getUsers.bind(this)
    this.deleteUser=this.deleteUser.bind(this)
}
async setAdmin(req:Request<SetAdminType["params"]>,res:Response){
    try{
        console.log(req.query,"query")
        const response = await this.service.setAdmin(req.params.id)
        res.status(200).send(response)
    }catch(error){
        logger.error({function:"UsersController.setAdmin",error} )
        res.status(500).send({error})
    }
        
}
async dropAdmin(req:Request<SetAdminType["params"]>,res:Response){
    try{
        const response= await this.service.dropAdmin(req.params.id)
        res.status(200).send(response)
    }catch(error){
        logger.error({function:"UsersController.dropAdmin",error})
        res.status(500).send({error})
    }

}
async addDepartment(req:Request<SetAdminType["params"],any,any,DepartmentType["query"]>,res:Response){
    try{
        const response = await this.service.addDepartment(req.params.id, req.query.name)
        res.status(200).send(response)
    }catch(error){
        logger.error({function:"UsersController.addDepartment",error})
        res.status(500).send({error})
    }
}
async addDepartments(req: Request<SetAdminType["params"],any,any,DepartmentsType["body"]>, res: Response){
try{
 
    const response =this.service.addDepartments(req.params.id,req.body.name)
    console.log(response)
    res.status(200).send(response)
}catch(error){
    logger.error({function:"UsersController.addDepartments",error})
    res.status(500).send({error})
}
}
async getUsers(_req:Request,res:Response){
    try{
        const response = await this.service.getUsers()
 console.log(response, "users")
        res.status(200).send(response)
    }catch(error){
        logger.error({function:"UsersController.getUsers",error})
        res.status(500).send({error})
    }
}
async deleteUser(req:Request<any,any,any,{id:string}>,res:Response){
    try{
        const response = await this.service.deleteUser(req.query.id)
        res.status(200).send(response)
    }catch(error){
        logger.error({function:"UsersController.deleteUser",error})
    }
}
}