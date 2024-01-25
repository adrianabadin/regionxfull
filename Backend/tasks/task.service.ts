import { logger } from "../Global.Services/logger";
import { prismaClient } from "../auth/auth.service";
import { TaskType } from "./task.schema";
export class TaskService{
    constructor(protected prisma=prismaClient){
        this.createTask=this.createTask.bind(this);
        this.getTasksByDepartment=this.getTasksByDepartment.bind(this);
    }
async createTask(data:TaskType){
    try{
        const response= await this.prisma.tasks.create(
            {data:{date:data.date,flag:data.flag,title:data.title,
                state:{connect:{state :data.state}},
                user:{connect:{username:data.username}},
                department:{connect:{name:data.service}}
            },
            include:
                {
                department:
                    {select:{name:true}},
                state:{select:{state:true}},
                user:{select:{username:true}}
            
            }})
            return response
    }catch(error){
        logger.error({function: "TaskService.createTask",error})
    }
}

async getTasksByDepartment(department?:string){
    try{


if (department===undefined) {
    console.log("x caaca")
    return await this.prisma.tasks.findMany({where:{},include:{department:{select:{name:true}},state:{select:{state:true}}}})}
else{return await this.prisma.tasks.findMany({
    where:{department:{name:department}}   
     ,include:{department:{select:{name:true}},state:{select:{state:true}}}})
    
    }

    }catch(error){
        logger.error({function: "TaskService.getTasks",error})
    }
}
}