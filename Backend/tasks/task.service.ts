import { logger } from "../Global.Services/logger";
import { prismaClient } from "../auth/auth.service";
import { NotFoundError, PrismaError, TimeoutOrConnectionError, UnknownPrismaError, isTimeout, notFound, returnPrismaError } from '../prisma/prisma.errors';
import { CloseTaskType, TaskType } from "./task.schema";
import AddDepartment from '../../Frontend/src/app/departments/config/components/AddDepartment';
export class TaskService{
    constructor(protected prisma=prismaClient){
        this.createTask=this.createTask.bind(this);
        this.getTasksByDepartment=this.getTasksByDepartment.bind(this);
        this.getTasksByState=this.getTasksByState.bind(this)
        this.getTasksByUserName=this.getTasksByUserName.bind(this)
        this.getTasks=this.getTasks.bind(this)
        this.deleteTask=this.deleteTask.bind(this)
        this.updateTask=this.updateTask.bind(this)
        this.closeTask=this.closeTask.bind(this)
    }
async createTask(data:TaskType){
    try{
        console.log(data)
        const response= await this.prisma.tasks.create(
            {data:{date:new Date(data.date),flag:data.flag,title:data.title,
                state:{connect:{state :data.state}},
                user:{connect:{username:data.username}},
                department:{connect:{name:data.department}}
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
async getTasks(username?:string,state?:string,department?:string,isCompleted?:boolean){
    try{

//if (username!==undefined)       
return await this.prisma.tasks.findMany(
    { 
        where:{
            AND:[{
                user:{username:username}
                },
                {isCompleted:(isCompleted !==undefined ?isCompleted :false)},
                {OR:
                    [
                        {department:{name:department}},
                        {state:{state:state}}
                    ]}
                ]}
                ,include:{department:{select:{name:true}},state:{select:{state:true}},user:{select:{username:true}}}
            })
    }catch(error){
        let response= notFound(error as Error)
        if (response === undefined) 
        {
            response=new UnknownPrismaError(error)           
        }
        logger.error({function:"TaskService.getTasks",error:response})
        return response
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

}
async deleteTask(id:string)
{
    try{
        const response=await this.prisma.tasks.delete({where:{id}})
        return response
    }catch(error){
        
        if (typeof error === "object" && error!==null &&"code" in error && error.code==="P2025") {
            logger.error({function:"TaskService.deleteTask",error:new NotFoundError()})
            return new NotFoundError()}
         
            logger.error({function:"TaskService.deleteTask",error:new UnknownPrismaError(error)})
        return    new UnknownPrismaError(error)
    }
    
}
async updateTask(data:TaskType&{id:string})
{
    try{
       const response= await  this.prisma.tasks.update(
            {
                where:
                    {id:data.id},
                    data:{
                        title:data.title,
                        date:new Date(data.date),
                        flag:data.flag,
                        user:{
                            connect:{username:data.username}
                        },
                        department:{
                            connect:{name:data.department}
                        },
                        state:{
                            connect:{state:data.state}
                        }
                    }})
    return response
                }
    catch(error){
        if (notFound(error as Error) !== undefined) {
            logger.error({function:'TaskService.updateTask',error:new NotFoundError()})
            return new NotFoundError()}
        else {
            if (isTimeout(error as Error) !== undefined) {
                logger.error({function:'TaskService.updateTask',error:new TimeoutOrConnectionError(error) })
                return new TimeoutOrConnectionError(error)
            } 
            else{
            logger.error({function:'TaskService.updateTask',error:new UnknownPrismaError()})
            return new UnknownPrismaError(error)}

    }
}
}
async closeTask(data:CloseTaskType){
    try{
        const response = await this.prisma.tasks.update({where:{id:data.id},data:{brief:data.brief,file:data.file,isCompleted:true},select:{id:true}})
        return response
    }catch(error){
        const typedError = returnPrismaError(error as Error)
        logger.error({function:"TaskService.closeTask",error: typedError})
        return typedError
    }
}
}