import { Request, Response } from "express";
import { FodaServicesService, fodaServicesService } from "./foda.service.service";
import {   RemoveServiceMember } from './foda.services.schema';
import { PrismaError } from "../../prisma/prisma.errors";
import { InvalidParameterException } from "./foda.services.errors";
import { FODAservice } from "./foda.services.schema";

export class FodaServicesController{
    constructor(protected service:FodaServicesService){
        this.create=this.create.bind(this);
        this.update=this.update.bind(this);
        this.getAllFODAByState=this.getAllFODAByState.bind(this)
        this.getByState=this.getByState.bind(this)
        this.removeMember=this.removeMember.bind(this)
    }
    async create(req:Request<any,any,any,{service:string}>,res:Response){
        const service= req.query.service
        if (service === undefined ) return res.status(404).send(new InvalidParameterException("Must provide a state String to make the request"))
        const response =this.service.create(service)
        if (response instanceof PrismaError)return  res.status(500).send(response)
        else return res.status(200).send(response)
    }
    async update(req:Request<any,any,FODAservice["body"]>,res:Response){
        const data=req.body
        const response = await this.service.update(data)
        if (response instanceof PrismaError) return res.status(500).send(response)
        if (response instanceof InvalidParameterException) return res.status(404).send(response)
        return res.status(200).send(response)
    }
    async getByState(req:Request<any,any,any,{service:string}>,res:Response){
        const service=req.query.service
        if (service === undefined)  return res.status(404).send(new InvalidParameterException("Must provide a state string"))
        const response = await this.service.getByState(service)
        if (response instanceof PrismaError) return res.status(500).send(response)
        return res.status(200).send(response)
    }
    async getAllFODAByState(req:Request<any,any,any,{service:string}>,res:Response){
        const service=req.query.service
        if (service === undefined)  return res.status(404).send(new InvalidParameterException("Must provide a state string"))
        const response = await this.service.getByStateHistory(service)
        if (response instanceof PrismaError) return res.status(500).send(response)
        return res.status(200).send(response)
    }
    async removeMember(req:Request<any,any,any,RemoveServiceMember["query"]>,res:Response){
        const {member,title,service}= req.query
        if ( title === undefined || service=== undefined ) return res.status(404).send(new InvalidParameterException("Must provide a title and a state to make this request"))
        let response
        switch(member){
            case "strength":
                {
                    response = await this.service.removeStrength(title,service)         
                    break;
                }
            case "menace":
                {
                    response = await this.service.removeMenace(title,service)         
                    break;
                }
            case "oportunity":
                {
                    
                        response = await this.service.removeOportunity(title,service)         
                        break;
                    
                }
            case "weakness":
                {
                    response = await this.service.removeWeakness(title,service)         
                    break;
                }
            default: return res.status(404).send(new InvalidParameterException("Member query is invalid"))
                
        }
    if (response instanceof PrismaError) return res.status(500).send(response)
    return res.status(200).send(response)
    }
}
export const fodaServicesController = new FodaServicesController(fodaServicesService)