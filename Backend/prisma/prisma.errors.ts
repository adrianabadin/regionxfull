import { Prisma } from "@prisma/client"

export abstract class PrismaError extends Error{
    public text:string
    public code:string
    public errorContent:any
    constructor(message:string,code:string,errorContent?:any){
        super(message)
        this.text=message
        this.code=code
        this.errorContent=errorContent
        this.name="Prisma Error"
    }
}
export function notFound(error:Error){
    if (typeof error === "object" && error!==null &&"code" in error && error.code==="P2025") {
        return new NotFoundError()}
        
    }   
export class NotFoundError extends PrismaError{
    constructor(errorContent?:any,message:string="El registro solicitado no existe",code:string="P2025"){
        super(message,code,errorContent)
        this.name="Not Found Error"

    }
}
export class TimeoutOrConnectionError extends PrismaError {
    constructor(errorContent?:any,message:string="Paso el tiempo de conexion o hay demasiadas conexiones a la base de datos",code:string="P2024"){
        super(message,code,errorContent)
        this.name="Timeout Or Connection Error"

    
}}
export function isTimeout(error:Error){
    if (typeof error === "object" && error!==null &&"code" in error && error.code==="P2024") {
        return new TimeoutOrConnectionError(error)}   
}
export function returnPrismaError(error:Error){
    return isTimeout(error)|| notFound(error) || new UnknownPrismaError(error)
}
export class UnknownPrismaError extends PrismaError{
    constructor(errorContent?:any,message:string="Error desconocido de la base de datos",code:string="PX"){
        super(message,code,errorContent)
        this.name="Unknown Prisma Error"
    }
}