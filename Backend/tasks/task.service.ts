import { logger } from "../Global.Services/logger";
import { prismaClient } from "../auth/auth.service";
import { TaskType } from "./task.schema";
export class TaskService{
    constructor(protected prisma=prismaClient){
        this.createTask=this.createTask.bind(this);
        this.getTasksByDepartment=this.getTasksByDepartment.bind(this);
        this.getTasksByState=this.getTasksByState.bind(this)
        this.getTasksByUserName=this.getTasksByUserName.bind(this)
        this.getTasks=this.getTasks.bind(this)
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
async getTasks(username:string,state:string,department:string){
    try{

//if (username!==undefined)       
return await this.prisma.tasks.findMany(
    { 
        where:{
            AND:[{
                user:{username:username}
                },
                {OR:
                    [
                        {department:{name:department}},
                        {state:{state:state}}
                    ]}
                ]}
                ,include:{department:{select:{name:true}},state:{select:{state:true}},user:{select:{username:true}}}
            })
//    else return await this.prisma.tasks.findMany({where:{},include:{department:{select:{name:true}},state:{select:{state:true}},user:{select:{username:true}}}})
    }catch(error){
        logger.error({function: "TaskService.getTasks",error})
    }
}
async getTasksByDepartment(department?:string){
    try{


if (department===undefined) {
    console.log("x caaca")
    return await this.prisma.tasks.findMany({
        where:{},
        include:{
            department:{select:{name:true}},
            state:{select:{state:true}},
            user:{select:{username:true}},
        }
    })}
else{return await this.prisma.tasks.findMany({
    where:{
        department:{name:department}
    },
    include:{
        department:{select:{name:true}},
        state:{select:{state:true}},
        user:{select:{username:true}}
    
    }})
    
    }

    }catch(error){
        logger.error({function: "TaskService.getTasks",error})
    }
}
async getTasksByState(state?:string){
    try{
        if (state === undefined) return await this.prisma.tasks.findMany({
            where:{},
            include:{
                department:{select:{name:true}},
                state:{select:{state:true}},
                user:{select:{username:true}},
            }
        })
        else return await this.prisma.tasks.findMany({
            where:{state:{state}},
            include:{
                state:{select:{state:true}},
                department:{select:{name:true}},
                user:{select:{username:true}}
            }})
    }catch(error){
        logger.error({function:"TaskService.getTasksByState",error})
    }
}
async getTasksByUserName(username:string){
    try{
        if(username === undefined) return await this.prisma.tasks.findMany({
            where:{},
            include:{
                department:{select:{name:true}},
                state:{select:{state:true}},
                user:{select:{username:true}},
            }
        })
        else return await this.prisma.tasks.findMany({
             where:{user:{username}},
             include:{
                department:{select:{name:true}},
                state:{select:{state:true}},
                user:{select:{username:true}}
            }})
    }
    catch(error){
        logger.error({function:"TaskService.getTasksByState",error})
    
}
}}