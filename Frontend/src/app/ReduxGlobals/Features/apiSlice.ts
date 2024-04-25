import {FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {z} from "zod"
import { AuthResponseType } from "./authSlice"


const dotenvSchema = z.object({
    NEXT_PUBLIC_BACKURL:z.string().url()
})
declare global{
    namespace NodeJS{
        interface ProcessEnv extends z.infer<typeof dotenvSchema>{} 
    }
}
/*************************
 * SCHEMAS
 *************************/
export const SignUpSchema = z.object({
    
     username:z.string().email({message:"Debes proveer un email valido"}),
     password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"}),
     password2:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"}),
     name:z.string().min(3,{message:"El nombre debe contener al menos 3 caracteres"}),
     lastname:z.string().min(3,{message:"El apellido debe contener al menos 3 caracteres"}),

    }).refine((value)=>{
        if (value.password===value.password2) return true
        else return false
    },{message:"Ambas contraseñas deben coincidir",path:["password2"]})
 
 
 export const LoginSchema = z.object({
          username:z.string().email({message:"debes proveer un email valido"}),
         password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"})
         
     })
 
/**
 * TYPES
 */ 
export type SignUpType =z.infer<typeof SignUpSchema>
export type LoginType = z.infer<typeof LoginSchema>

/**
 * API
 */
export const apiSlice=createApi({
    reducerPath: "api",
    baseQuery:fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_BACKURL,credentials:"include",mode:"cors",headers:{"Access-Control-Allow-Origin":'http://localhost:3000'}}),
    
    endpoints:(builder)=>({
        login:builder.mutation<AuthResponseType,LoginType>({
            query:(authData)=>
            ({url:`/auth/login`,
            headers:{"Content-Type": "application/json"},
            method: 'POST',      
            body:authData}),
     
        }),
        signUp:builder.mutation<AuthResponseType,SignUpType>({
          query:(signUpData)=>({
            url:"/auth/signup",
            method:"POST",
            body:signUpData
          })
        }),
        logout:builder.query<any,undefined>({
            query:()=>({
                url:'/auth/logout',
                method:"get"
            })
        })
    })
    })
export const {useLoginMutation,useSignUpMutation,useLogoutQuery}=apiSlice