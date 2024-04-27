import { Prisma, PrismaClient } from "@prisma/client";
import { SignUpSchema, SignUpType } from "./auth.schema";
import { logger } from "../Global.Services/logger";
import argon2 from "argon2";
import { z } from "zod";
import jwt from "jsonwebtoken"
import { returnPrismaError } from '../prisma/prisma.errors';
import { IssuanceMissingId } from "./auth.errors";
export const prismaClient = new PrismaClient()
export class AuthService{
protected prisma=prismaClient
    constructor(){
    this.SignUpUser=this.SignUpUser.bind(this)
    this.jwtIssuance=this.jwtIssuance.bind(this)
}
async SignUpUser (data:SignUpType){
    try{
        const parsedSchema = SignUpSchema.shape.body
        
    const result =parsedSchema.safeParse(data)
    if (!result.success) throw new Error("Los datos enviados no validan SignUpType")
    
    const hash=await argon2.hash(data.password)
     const dataWithHash:Prisma.UsersCreateInput ={
        hash,lastname:data.lastname,name:data.name,username:data.username
    }
    const response =await this.prisma.users.create({data:dataWithHash})
    console.log(response)
    return response
    }catch(err){
        const error = returnPrismaError(err as Error)
        logger.error({function:"AuthService.SignUpUser",error})
        return error
}
}
 jwtIssuance(id:string){
        if (id === undefined) return new IssuanceMissingId()
        return   jwt.sign({id,date:new Date()},"Gran tipo MILEI",{expiresIn:600})
 }
}