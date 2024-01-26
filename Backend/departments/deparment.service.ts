import { prismaClient } from "../auth/auth.service";
import { logger } from "../Global.Services/logger";
import { departmentCreateType, departmentSchemaCreate } from './department.schema';

export class DeparmentService{
    constructor(protected prisma=prismaClient){
this.createDepartment=this.createDepartment.bind(this);
this.getDepartments=this.getDepartments.bind(this);
}
    async createDepartment(data:departmentCreateType["body"]){
        try{
            departmentSchemaCreate.parse({body:data})
            console.log(data)
            const response = await this.prisma.departments.create({data})
            return response
        }catch(error){
            logger.error({function:"DeparmentService.createDepartment",error})
        }
    }
    async getDepartments(username:string){
        try{console.log(username)
            if (username === undefined ) return await this.prisma.departments.findMany({})
            const response = await this.prisma.departments.findMany({
        where:{responsable:{username}}})
            console.log(response)
            return response 
        }
    catch(error){
        logger.error({function:"DeparmentService.getDepartments",error})
    }
}
}