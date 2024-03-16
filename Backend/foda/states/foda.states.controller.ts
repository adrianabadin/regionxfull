import { Request, Response } from "express";
import { FodaStateService, fodaStateService } from "./foda.states.service";
import { FODAstate, RemoveMember } from './foda.states.schema';
import { PrismaError } from "../../prisma/prisma.errors";
import { InvalidParameterException } from "./foda.states.errors";

export class FodaStateController{
    constructor(protected service:FodaStateService){
        this.create=this.create.bind(this);
        this.update=this.update.bind(this);
        this.getByState=this.getByState.bind(this)
        this.removeMember=this.removeMember.bind(this)
        this.getAllFODAByStateHistory=this.getAllFODAByStateHistory.bind(this)
    }
    async create(req:Request<any,any,any,{state:string}>,res:Response){
        const state= req.query.state
        if (state === undefined ) return res.status(404).send(new InvalidParameterException("Must provide a state String to make the request"))
        const response =this.service.create(state)
        if (response instanceof PrismaError)return  res.status(500).send(response)
        else return res.status(200).send(response)
    }
    async update(req:Request<any,any,FODAstate["body"]>,res:Response){
        const data=req.body
        const response = await this.service.update(data)
        if (response instanceof PrismaError) res.status(500).send(response)
        if (response instanceof InvalidParameterException) res.status(404).send(response)
        res.status(200).send(response)
    }
    async getByState(req:Request<any,any,any,{state:string}>,res:Response){
        const state=req.query.state
        if (state === undefined)  return res.status(404).send(new InvalidParameterException("Must provide a state string"))
        const response = await this.service.getByState(state)
        if (response instanceof PrismaError) return res.status(500).send(response)
        return res.status(200).send(response)
    }

    async getAllFODAByStateHistory(req:Request<any,any,any,{state:string}>,res:Response){
        const state=req.query.state
        if (state === undefined)  return res.status(404).send(new InvalidParameterException("Must provide a state string"))
        const response = await this.service.getByStateHistory(state)
        if (response instanceof PrismaError) return res.status(500).send(response)
        return res.status(200).send(response)
    }
    async removeMember(req:Request<any,any,any,RemoveMember["query"]>,res:Response){
        const {member,title,state}= req.query
        if ( title === undefined || state=== undefined ) return res.status(404).send(new InvalidParameterException("Must provide a title and a state to make this request"))
        let response
        switch(member){
            case "strengths":
                {
                    response = await this.service.removeStrength(title,state)         
                    console.log(response,"texto del controller")
                    break;
                }
            case "menace":
                {
                    response = await this.service.removeMenace(title,state)         
                    break;
                }
            case "oportunity":
                {
                    
                        response = await this.service.removeOportunity(title,state)         
                        break;
                    
                }
            case "weakness":
                {
                    response = await this.service.removeWeakness(title,state)         
                    break;
                }
            default: return res.status(404).send(new InvalidParameterException("Member query is invalid"))
                
        }
    if (response instanceof PrismaError) return res.status(500).send(response)
    return res.status(200).send(response)
    }
}
export const fodaStateController = new FodaStateController(fodaStateService)