import { Request } from "express";
import { DoneCallback } from "passport";
import { VerifyFunctionWithRequest } from "passport-local";
import { logger } from "../Global.Services/logger";
import { AuthService, prismaClient } from "./auth.service";
import { SignUpType } from "./auth.schema";
import argon from "argon2"
import { JWTMissing, UserDoesntExists, WrongPassword } from "./auth.errors";
import jwt from 'jsonwebtoken';
import { CreateUserError, PrismaError, returnPrismaError, UserExistError } from "../prisma/prisma.errors";

export class AuthVerifyModule {
    protected service=new AuthService()
    protected prisma = prismaClient
    constructor(){
        this.signUpVerify=this.signUpVerify.bind(this)
        this.loginVerify=this.loginVerify.bind(this)
        this.jwtVerify=this.jwtVerify.bind(this)
    }
    async signUpVerify(req:Request<any,any,SignUpType>,username:string,_password:string,done:any){
        try{
            let user = await this.prisma.users.findUnique({where:{username}})
            console.log(user,"debe ser undefined")
            if (user !== null){
                return done(new UserExistError(),false)
            }
            const response = await this.service.SignUpUser(req.body)
            if (response instanceof PrismaError) return done(new CreateUserError(),false)
            if (response !==undefined) return done(null,response)
            else return done (new CreateUserError(),false)

        }catch(err){
            const error = returnPrismaError(err as Error)
            logger.error({function:"AuthVerifyModule.signUpVerify",error}
        )
        return done(error,false)
    }
    }
    async loginVerify(username:string,password:string,done:(...args:any)=>any){
        try{
            const user = await this.prisma.users.findUnique({where:{username}})
            console.log(user)
            if (user !==null) // si el usuario existe
            {
                if (user?.hash !==undefined && await argon.verify(user.hash,password))
                {
                    return done(null,user)
                }else return done(new WrongPassword(),false)
            }else return done(new UserDoesntExists(),false)
        }
        catch(err){
            const error = returnPrismaError(err as Error)
            logger.error({function:"AuthVerifyModule.loginVerify",error})
            return done(error,false)
    }
    }
    async jwtVerify(payload:jwt.JwtPayload,done:(...args:any)=>void){
        try{
            let user = null
            if (payload === undefined) return done(new JWTMissing(),false)
            user=await this.prisma.users.findUnique({where:{id:(payload as any).id }})    
            if (user === null) return done(new UserDoesntExists(),false)
            if (user instanceof PrismaError) return done(user,false)
            else return done(null,user)
        }catch(err){
            return done(err,false)
        }
    }
}
export const authServiceVerify= new AuthVerifyModule()