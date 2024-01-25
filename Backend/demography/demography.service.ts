import { logger } from "../Global.Services/logger";
import { prismaClient } from "../auth/auth.service";
import { DemographySchema, DemographyType } from "./demography.schema";
export class DemographyService{
    constructor(protected prisma=prismaClient){
        this.createState=this.createState.bind(this);
        this.getStates=this.getStates.bind(this);
    }
    async createState(data:DemographyType["body"]){
        try{
            DemographySchema.parse({body:data})
            const response= await this.prisma.demography.create({data})
            return response
        }
        catch(error){
            logger.error({function:"DemographyService.createState",error})
        }
    }
    async getStates(){
        try{
            const response = await this.prisma.demography.findMany({})
            return response
        }
        catch(error){
            logger.error({function:"DemographyService.getStates",error})
        }
    }

}