
import { query } from "express";
import { logger } from "../Global.Services/logger";
import { prismaClient } from "../auth/auth.service";
import { departmentSchema, departmentsSchema, setAdminSchema } from "./users.schema";
export class UsersService {
    constructor(protected prisma=prismaClient){
        this.setAdmin=this.setAdmin.bind(this)
        this.addDepartment=this.addDepartment.bind(this)
        this.addDepartments=this.addDepartments.bind(this)
    }
    async setAdmin(id:string){
        try{
            const result =setAdminSchema.shape.params.safeParse({id})
            if (result.success){
            const response = await this.prisma.users.update({where:{id},data:{isAdmin:true}})
            return response} else throw new Error(result.error.issues[0].message)
        }catch(error){
            logger.error({function:"UsersService.updateUser",error})
        }
    }
    async addDepartment(id:string,departmentName:string){
        try{
            departmentSchema.parse({query:{name:departmentName}})
            setAdminSchema.parse({params:{id}})
            const response = await this.prisma.users.update({where:{id},data:{departments:{connect:{name:departmentName}}}})
            return response
        }catch(error){{logger.error({function:"UsersService.addDepartment",error})}}
    }
    async addDepartments(id:string,departmentArray:string[]){
        try{
            departmentsSchema.parse({query:{name:departmentArray}})
            setAdminSchema.parse({params:{id}})
            const response = await this.prisma.users.update({where: {id},data:{departments:{connect:departmentArray.map(name=>({name}))}}})
            return response
        }catch(error){{logger.error({function:"UsersService.addDepartments",error})}}
    }
}