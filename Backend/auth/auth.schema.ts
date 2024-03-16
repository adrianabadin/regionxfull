import { NextFunction, Request, Response } from "express"
import {AnyZodObject, z} from "zod"

export function validateSchemaMiddleware(schema:AnyZodObject) {
    return (req:Request,res:Response,next:NextFunction)=>{
        const {query,params,body}= req
        let request={}
        console.log(typeof body)
        if (query !== undefined && typeof query ==="string"&& query !==null) request ={...request,query:JSON.parse(query)}
        else if (typeof query ==="object") request ={...request,query}
        if (body !== undefined && typeof body ==="string" && body !==null) request ={...request,body:JSON.parse(body)}
        else if (typeof body ==="object") request ={...request,body}
        if (params !== undefined && typeof params ==="string"&& params !==null) request ={...request,params:JSON.parse(params)}
        else if (typeof params ==="object") request ={...request,params}
        
        const response = schema.safeParse(request)
        console.log(req.body,response,request)
        if (response.success) {
            console.log("Success")
            next()}        
        else {
    let errors:{field:string,message:string,complete:string}[]=[]
    response.error.issues.forEach(error=>{
        errors.push({field:error.path[0] as string,message:error.message,complete:`El campo ${error.path[0]} ${error.message}`})

    })
    console.log("not validated",errors)
    res.status(400).send(errors)
    return
        }
    
        }
}
/**
 * SCHEMAS
 */

export const SignUpSchema = z.object({
   body:z.object({
    username:z.string().email({message:"Debes proveer un email valido"}),
    password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"}),
    name:z.string().min(3,{message:"El nombre debe contener al menos 3 caracteres"}),
    lastname:z.string().min(3,{message:"El apellido debe contener al menos 3 caracteres"}),
   })
})

export const LoginSchema = z.object({
    body:z.object({
        username:z.string().email({message:"debes proveer un email valido"}),
        password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"})
        
    })
})



/**
 * TYPES
 */

export type SignUpType = z.infer<typeof SignUpSchema>["body"]
export type LoginType=z.infer<typeof LoginSchema>["body"]