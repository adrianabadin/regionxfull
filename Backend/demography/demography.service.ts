import { PrismaClient } from "@prisma/client";
import { logger } from "../Global.Services/logger";
import { prismaClient } from "../auth/auth.service";
import { FodaStateService, fodaStateService as FodaStateServiceInstance } from "../foda/states/foda.states.service";
import { PrismaError, returnPrismaError } from "../prisma/prisma.errors";
import { DemographySchema, DemographyType } from "./demography.schema";

export class DemographyService{
    constructor(
        protected prisma:PrismaClient=prismaClient,
        protected fodaStateService:FodaStateService=FodaStateServiceInstance
        ){
        this.createState=this.createState.bind(this);
        this.getStates=this.getStates.bind(this);
        
    }
    async createState(data:DemographyType["body"]){
        try{
            DemographySchema.parse({body:data})
            const response= await this.prisma.demography.create({data})
            const fodaResponse =await this.fodaStateService.create(data.state)
            if (fodaResponse instanceof PrismaError) throw fodaResponse
            return {...response,FODAstateId:fodaResponse.id}
        }
        catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"DemographyService.createState",error:newError})
            return newError
        }
    }
    async getStates(){
        try{
            const response = await this.prisma.demography.findMany({})
            return response
        }
        catch(error){
            const newError = returnPrismaError(error as Error)
            logger.error({function:"DemographyService.getStates",error:newError})
            return newError
        }
    }

}