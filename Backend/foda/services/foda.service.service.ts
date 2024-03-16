// import { Prisma, PrismaClient } from "@prisma/client";
// import { prismaClient } from "../../auth/auth.service";
// import { NotFoundError, returnPrismaError } from "../../prisma/prisma.errors";
// import { logger } from "../../Global.Services/logger";
// import { InvalidParameterException } from "./foda.services.errors";
// import { FODAservice, fodaServiceSchema } from "./foda.services.schema";

// export class FodaServicesService {
//     constructor(protected prisma:PrismaClient){
//         this.create=this.create.bind(this);
//         this.getAllFODAByState=this.getAllFODAByState.bind(this);
//         this.getByState=this.getByState.bind(this);
//         this.removeMenace=this.removeMenace.bind(this);
//         this.removeOportunitiy=this.removeOportunitiy.bind(this);
//         this.removeStrength=this.removeStrength.bind(this);
//         this.removeWeakness=this.removeWeakness.bind(this);
//         this.update=this.update.bind(this)
//     }
//     async create(service:string){
//         try {
//             const response = await this.prisma.fODAservices.create({
//                 data:
//                     {service:{connect:{name:service}}},include:{service:{select:{name:true}}}})
//         return {...response,service:response.service.name}
//         }catch(error){
//             const newError = returnPrismaError(error as Error)
//             logger.error({function:"FodaStateService.create",newError})
//             return newError
//         }
//     }
//     async update(data:FODAservice["body"]){
//         try{
//             const result =fodaServiceSchema.safeParse({body:data})
//             if (!result.success) {                
//                 throw new InvalidParameterException("FodaStateService.update: "+result.error.message)}
//             const fodaObject = await this.prisma.fODAservices.findFirst({where:{service:{name:data.service}},include:{menaces:true,opotunities:true,strengths:true,wekneasess:true}})   
//             if (fodaObject !==null){
//                 let {strengths,menaces,opotunities,wekneasess,departmentsId}=fodaObject
//                 const response= await this.prisma.fODAservices.update(
//                     {
//                         where:{departmentsId},
//                         data:{
//                             menaces:{connect:menaces,create:data.menaces},
//                             opotunities:{connect:opotunities,create:data.oportunities},
//                             strengths:{connect:strengths,create:data.strengths},
//                             wekneasess:{connect:wekneasess,create:data.weakneses}
//                         },include:{
//                             menaces:{where:{isActive:true}, select:{title:true,description:true}},
//                             opotunities:{where:{isActive:true},select:{title:true,description:true}},
//                             strengths:{where:{isActive:true},select:{title:true,description:true}},
//                             wekneasess:{where:{isActive:true},select:{title:true,description:true}},
//                             service:{select:{name:true,description:true}}
                        
//                         }})
//                         return {
//                             ...response,
//                             state:response.service,
//                             strengths:response.strengths,
//                             oportunities:response.opotunities,
//                             opotunities:undefined,
//                             weaknesses:response.wekneasess,
//                             menaces:response.menaces,
//                         }
//             }
            
//         }catch(error){
//             if (error instanceof InvalidParameterException) return error
//             const newError = returnPrismaError(error as Error)
//             logger.error({function:"FodaStateService.create",newError})
//             return newError
//         }
//     }
//     async getByState(service: string){
//         try{//HASTA ACA LLEGUE 
//             const response = await this.prisma.fODAservices.findFirst(
//                 {
//                     where:{service:{name:service}},
//                     include:{
//                         menaces:{ 
//                             where:{isActive:true},
//                             select:{  title:true,description:true}},
//                         opotunities:{
//                             where:{isActive:true},
//                             select:{ title:true,description:true}},
//                         strengths:{
//                             where:{isActive:true},
//                             select:{ title:true,description:true}},
                            
//                         wekneasess:{
//                             where:{isActive:true},
//                             select:{title:true,description:true}},
//                         service:{select:{name:true}}}})
//             if (response !== null)
//                 return {
//                     ...response,
//                     service:response?.service.name,
//                     weaknesses:response?.wekneasess,
//                     oportunities:response?.opotunities,
//                     menaces:response?.menaces,
//                     strengths:response?.strengths
//                 }
//             else throw new NotFoundError("Unable to find any FODA items for the state provided")
//         }
//         catch(error){
//             const newError = returnPrismaError(error as Error)
//             logger.error({function:"FodaStateService.create",newError})
//             return newError
//         }
//     }
//    async removeMenace(title:string,service:string){
//     try{//hasta aca 
//        const serviceId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{id:true}})).id 
//        const response=await  this.prisma.menace.updateMany(
//         {where: 
//             {
//                 AND:[
//                     {
//                         title:title,
//                         fODAservicesId:serviceId
//                     }
//                 ]
//             },
//             data:{isActive:false}})
//             if (response.count===0) throw new NotFoundError()
//             return response.count
//     }catch(error){
//         const newError = returnPrismaError(error as Error)
//         logger.error({function:"FodaStateService.create",newError})
//         return newError
//     }
//    } 
//    async removeWeakness(title:string,service:string){
//     try{
//        const serviceId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{id:true}})).id 
//        const response=await  this.prisma.weakness.updateMany(
//         {where: 
//             {
//                 AND:[
//                     {
//                         title:title,
//                         fODAservicesId:serviceId
//                     }
//                 ]
//             },
//             data:{isActive:false}})
//             if (response.count===0) throw new NotFoundError()
//             return response.count
//     }catch(error){
//         const newError = returnPrismaError(error as Error)
//         logger.error({function:"FodaStateService.create",newError})
//         return newError
//     }
//    }
//    async removeStrength(title:string,service:string){
//     try{
//        const seriviceId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{id:true}})).id 
//        const response=await  this.prisma.strength.updateMany(
//         {where: 
//             {
//                 AND:[
//                     {
//                         title:title,
//                         fODAservicesId:seriviceId
//                     }
//                 ]
//             },
//             data:{isActive:false}})
//             if (response.count===0) throw new NotFoundError()
//             return response.count
//     }catch(error){
//         const newError = returnPrismaError(error as Error)
//         logger.error({function:"FodaStateService.create",newError})
//         return newError
//     }
//    }  
//    async removeOportunitiy(title:string,service:string){
//     try{
//        const serviceId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{id:true}})).id 
//        const response=await  this.prisma.oportunity.updateMany(
//         {where: 
//             {
//                 AND:[
//                     {
//                         title:title,
//                         fODAservicesId:serviceId
//                     }
//                 ]
//             },
//             data:{isActive:false}})
//             if (response.count===0) throw new NotFoundError()
//             return response.count
//     }catch(error){
//         const newError = returnPrismaError(error as Error)
//         logger.error({function:"FodaStateService.create",newError})
//         return newError
//     }
//    } 
//    async getAllFODAByState(service:string){
//     try{
//         const response = await this.prisma.fODAservices.findFirst(
//             {
//                 where:{service:{name:service}},
//                 include:{
//                     menaces:{ 
//                         select:{  title:true,description:true}},
//                     opotunities:{
//                         select:{ title:true,description:true}},
//                     strengths:{
//                         select:{ title:true,description:true}},
//                     wekneasess:{
//                         select:{title:true,description:true}},
//                     service:{select:{name:true}}}})
//                     if (response === null ) throw new NotFoundError("Unable to find any FODA items for the state provided")
//                     return {...response,service:response.service.name}
//     }catch(error){
//         const newError = returnPrismaError(error as Error)
//         logger.error({function:"FodaStateService.create",newError})
//         return newError
//     }
//    }
// }
// export const fodaServicesService =new FodaServicesService(prismaClient)

import { Prisma, PrismaClient } from "@prisma/client";
import { FODAservice, fodaServiceSchema } from "./foda.services.schema";
import { prismaClient } from "../../auth/auth.service";
import { NotFoundError, returnPrismaError } from "../../prisma/prisma.errors";
import { logger } from "../../Global.Services/logger";
import { InvalidParameterException } from "../states/foda.states.errors";

export class FodaServicesService {
    constructor(protected prisma:PrismaClient){
        this.create=this.create.bind(this);
        this.getByState=this.getByState.bind(this);
        this.removeMenace=this.removeMenace.bind(this);
        this.removeOportunity=this.removeOportunity.bind(this);
        this.removeStrength=this.removeStrength.bind(this);
        this.removeWeakness=this.removeWeakness.bind(this);
        this.update=this.update.bind(this)
        this.getByStateHistory=this.getByStateHistory.bind(this)
    }
    async create(service:string){
        try {
            const response = await this.prisma.fODAservices.create({
                data:
                    {service:{connect:{name:service}}},include:{service:{select:{name:true}}}})
        return {...response,service:response.service.name}
        }catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"FodaStateService.create",newError})
            return newError
        }
    }
    async update(data:FODAservice["body"]){
        try{
            const result =fodaServiceSchema.safeParse({body:data})
            if (!result.success) {                
                throw new InvalidParameterException("FodaStateService.update: "+result.error.message)}
            const fodaObject = await this.prisma.fODAservices.findFirst({where:{service:{name:data.service}},include:{menaces:true,opotunities:true,strengths:true,wekneasess:true}})   
            if (fodaObject !==null){
                let {strengths,menaces,opotunities,wekneasess,departmentsId}=fodaObject
                const response= await this.prisma.fODAservices.update(
                    {
                        where:{departmentsId},
                        data:{
                            menaces:{connect:menaces,create:data.menaces},
                            opotunities:{connect:opotunities,create:data.oportunities},
                            strengths:{connect:strengths,create:data.strengths},
                            wekneasess:{connect:wekneasess,create:data.weakneses}
                        },include:{
                            menaces:{where:{isActive:true}, select:{title:true,description:true}},
                            opotunities:{where:{isActive:true},select:{title:true,description:true}},
                            strengths:{where:{isActive:true},select:{title:true,description:true}},
                            wekneasess:{where:{isActive:true},select:{title:true,description:true}},
                            service:{select:{name:true}}
                        
                        }})
                        return {
                            ...response,
                            state:response.service.name,
                            strengths:response.strengths,
                            oportunities:response.opotunities,
                            opotunities:undefined,
                            weaknesses:response.wekneasess,
                            wekneasess:undefined,
                            menaces:response.menaces,
                        }
            }
            
        }catch(error){
            if (error instanceof InvalidParameterException) return error
            const newError = returnPrismaError(error as Error)
            logger.error({function:"FodaStateService.create",newError})
            return newError
        }
    }
    async getByState(service: string){
        try{
            const response = await this.prisma.fODAservices.findFirst(
                {
                    where:{service:{name:service}},
                    include:{
                        menaces:{ 
                            where:{isActive:true},
                            select:{  title:true,description:true}},
                        opotunities:{
                            where:{isActive:true},
                            select:{ title:true,description:true}},
                        strengths:{
                            where:{isActive:true},
                            select:{ title:true,description:true}},
                            
                        wekneasess:{
                            where:{isActive:true},
                            select:{title:true,description:true}},
                        service:{select:{name:true}}}})
            if (response !== null)
                return {
                    ...response,
                    service:response?.service.name,
                    weaknesses:response?.wekneasess,
                    wekneasess:undefined,
                    oportunities:response?.opotunities,
                    opotunities:undefined,
                    menaces:response?.menaces,
                    strengths:response?.strengths
                }
            else throw new NotFoundError("Unable to find any FODA items for the state provided")
        }
        catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"FodaStateService.create",newError})
            return newError
        }
    }
    async removeMenace(title:string,service:string){
        try{
           const FodaServiceId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{FODAservices:{select:{id:true}}}})).FODAservices?.id 
           if (FodaServiceId === undefined )throw new NotFoundError("Unable to locate the service provided")
           const response=await  this.prisma.menace.updateMany(
            {where: 
                {
                    AND:[
                        {
                            title:title,
                            fODAservicesId:FodaServiceId
                        }
                    ]
                },
                data:{isActive:false}})
                if (response.count===0) throw new NotFoundError("Unable to find a Match between the service and the title provided")
                return {title,service,ok:true}
        }catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"FodaStateService.create",newError})
            return newError
        }
       } 
    async getByStateHistory(service: string){
    try{
        const response = await this.prisma.fODAservices.findFirst(
            {
                where:{service:{name:service}},
                include:{
                    menaces:{ 
                        
                        select:{  title:true,description:true}},
                    opotunities:{
                        
                        select:{ title:true,description:true}},
                    strengths:{
                        
                        select:{ title:true,description:true}},
                        
                    wekneasess:{
                        
                        select:{title:true,description:true}},
                    service:{select:{name:true}}}})
        if (response !== null)
            return {
                ...response,
                service:response?.service.name,
                weaknesses:response?.wekneasess,
                wekneasess:undefined,
                oportunities:response?.opotunities,
                opotunities:undefined,
                menaces:response?.menaces,
                strengths:response?.strengths
            }
        else throw new NotFoundError("Unable to find any FODA items for the state provided")
    }
    catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
}

async removeWeakness(title:string,service:string){
    try{
       const fODAservicesId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{FODAservices:{select:{id:true}}}})).FODAservices?.id 
       if (fODAservicesId === undefined ) throw new NotFoundError("Unable to find a match to the service string provided")
       const response=await  this.prisma.weakness.updateMany(
        {where: 
            {
                AND:[
                    {
                        title:title,
                        fODAservicesId
                    }
                ]
            },
            data:{isActive:false}})
            if (response.count===0) throw new NotFoundError("Unable to find a Match between the service and the title provided"            )
            return {title,service,ok:true}
    }catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
   }    
   async removeStrength(title:string,service:string){
    try{
       const fODAservicesId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{FODAservices:{select:{id:true}}}})).FODAservices?.id 
       if (fODAservicesId === undefined ) throw new NotFoundError("Unable to find a match to the service string provided")
       const response=await  this.prisma.strength.updateMany(
        {where: 
            {
                AND:[
                    {
                        title:title,
                        fODAservicesId
                    }
                ]
            },
            data:{isActive:false}})
            if (response.count===0) throw new NotFoundError("Unable to find a Match between the service and the title provided")
            return {title,service,ok:true}
    }catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
   }  
   async removeOportunity(title:string,service:string){
    try{
       const fODAservicesId=(await this.prisma.departments.findUniqueOrThrow({where:{name:service},select:{FODAservices:{select:{id:true}}}})).FODAservices?.id 
       if (fODAservicesId ===undefined) throw new NotFoundError("Unable to find a match to the service string provided")
       const response=await  this.prisma.oportunity.updateMany(
        {where: 
            {
                AND:[
                    {
                        title:title,
                        fODAservicesId
                    }
                ]
            },
            data:{isActive:false}})
            if (response.count===0) throw new NotFoundError("Unable to find a Match between the service and the title provided")
            return {title,service,ok:true}
    }catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
   } 
}
export const fodaServicesService =new FodaServicesService(prismaClient)