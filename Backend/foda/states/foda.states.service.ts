import { Prisma, PrismaClient } from "@prisma/client";
import { FODAstate, fodaStateSchema } from "./foda.states.schema";
import { prismaClient } from "../../auth/auth.service";
import { NotFoundError, returnPrismaError } from "../../prisma/prisma.errors";
import { logger } from "../../Global.Services/logger";
import { InvalidParameterException } from "./foda.states.errors";

export class FodaStateService {
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
    async create(state:string){
        try {
            const response = await this.prisma.fODAstates.create({
                data:
                    {state:{connect:{state}}},include:{state:{select:{state:true}}}})
        return {...response,state:response.state.state}
        }catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"FodaStateService.create",newError})
            return newError
        }
    }
    async update(data:FODAstate["body"]){
        try{
            const result =fodaStateSchema.safeParse({body:data})
            if (!result.success) {                
                throw new InvalidParameterException("FodaStateService.update: "+result.error.message)}
            const fodaObject = await this.prisma.fODAstates.findFirst({where:{state:{state:data.state}},include:{menaces:true,opotunities:true,strengths:true,wekneasess:true}})   
            if (fodaObject !==null){
                let {strengths,menaces,opotunities,wekneasess,demographyId}=fodaObject
                const response= await this.prisma.fODAstates.update(
                    {
                        where:{demographyId},
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
                            state:{select:{state:true,description:true}}
                        
                        }})
                        return {
                            ...response,
                            state:response.state.state,
                            strengths:response.strengths,
                            oportunities:response.opotunities,
                            opotunities:undefined,
                            weaknesses:response.wekneasess,
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
    async getByState(state: string){
        try{
            const response = await this.prisma.fODAstates.findFirst(
                {
                    where:{state:{state}},
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
                        state:{select:{state:true}}}})
            if (response !== null)
                return {
                    ...response,
                    state:response?.state.state,
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
    async removeMenace(title:string,state:string){
        try{
           const stateId=(await this.prisma.demography.findUniqueOrThrow({where:{state},select:{FODAstates:{select:{id:true}}}})).FODAstates?.id 
           const response=await  this.prisma.menace.updateMany(
            {where: 
                {
                    AND:[
                        {
                            title:title,
                            fODAstatesId:stateId
                        }
                    ]
                },
                data:{isActive:false}})
                if (response.count===0) throw new NotFoundError()
                return {title,state,ok:true}
        }catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"FodaStateService.create",newError})
            return newError
        }
       } 
    async getByStateHistory(state: string){
    try{
        const response = await this.prisma.fODAstates.findFirst(
            {
                where:{state:{state}},
                include:{
                    menaces:{ 
                        
                        select:{  title:true,description:true}},
                    opotunities:{
                        
                        select:{ title:true,description:true}},
                    strengths:{
                        
                        select:{ title:true,description:true}},
                        
                    wekneasess:{
                        
                        select:{title:true,description:true}},
                    state:{select:{state:true}}}})
        if (response !== null)
            return {
                ...response,
                state:response?.state.state,
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

async removeWeakness(title:string,state:string){
    try{
       const stateId=(await this.prisma.demography.findUniqueOrThrow({where:{state},select:{FODAstates:{select:{id:true}}}})).FODAstates?.id 
       const response=await  this.prisma.weakness.updateMany(
        {where: 
            {
                AND:[
                    {
                        title:title,
                        fODAstatesId:stateId
                    }
                ]
            },
            data:{isActive:false}})
            if (response.count===0) throw new NotFoundError()
            return {title,state,ok:true}
    }catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
   }    async removeStrength(title:string,state:string){
    try{
       const stateId=(await this.prisma.demography.findUniqueOrThrow({where:{state},select:{FODAstates:{select:{id:true}}}})).FODAstates?.id 
       const response=await  this.prisma.strength.updateMany(
        {where: 
            {
                AND:[
                    {
                        title:title,
                        fODAstatesId:stateId
                    }
                ]
            },
            data:{isActive:false}})
            if (response.count===0) throw new NotFoundError()
            return {title,state,ok:true}
    }catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
   }  
   async removeOportunity(title:string,state:string){
    try{
       const stateId=(await this.prisma.demography.findUniqueOrThrow({where:{state},select:{FODAstates:{select:{id:true}}}})).FODAstates?.id 
       const response=await  this.prisma.oportunity.updateMany(
        {where: 
            {
                AND:[
                    {
                        title:title,
                        fODAstatesId:stateId
                    }
                ]
            },
            data:{isActive:false}})
            if (response.count===0) throw new NotFoundError()
            return {title,state,ok:true}
    }catch(error){
        const newError = returnPrismaError(error as Error)
        logger.error({function:"FodaStateService.create",newError})
        return newError
    }
   } 
}
export const fodaStateService =new FodaStateService(prismaClient)