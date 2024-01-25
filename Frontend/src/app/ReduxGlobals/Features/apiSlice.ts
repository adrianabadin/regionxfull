import {FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {z} from "zod"
import { AuthResponseType } from "./authSlice"
import { DepartmentAddType } from "@/app/departments/config/components/AddDepartment"
import { DemografyCreateType } from "@/app/departments/config/components/AddState"


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
     isAdmin:z.boolean({invalid_type_error:"isAdmin debe ser un boolean"}).optional(),
     departments:z.array(z.object({
        id:z.string(),
        name:z.string()
     })).optional(),

    }).refine((value)=>{
        if (value.password===value.password2) return true
        else return false
    },{message:"Ambas contraseñas deben coincidir",path:["password2"]})
 
 
 export const LoginSchema = z.object({
          username:z.string().email({message:"debes proveer un email valido"}),
         password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"})
         
     })

     /**
      * {
  "id": "a1e5d02a-299d-4a6d-980b-63f4a841ff39",
  "createdAt": "2024-01-22T19:58:09.226Z",
  "updatedAt": "2024-01-22T19:58:09.226Z",
  "name": "Adrian",
  "description": "Adrian danel",
  "usersId": null
}
      */
export const DepartmentCreateSchema= z.object({
    id:z.string().uuid({message:"ID debe ser un UUID"}),
    name:z.string().min(3,{message:"El nombre debe tener 3 caracteres"}),
    description:z.string().min(3,{message:"La desripcion debe tener 3 caracteres"})

}) 
export type DepartmentResponseType = z.infer<typeof DepartmentCreateSchema>
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
    baseQuery:fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_BACKURL,credentials:"include",mode:"cors",headers:{"Access-Control-Allow-Origin":process.env.NEXT_PUBLIC_BACKURL}}),
        tagTypes:["users","departments","states"],
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
        }),
        getUsers:builder.query<AuthResponseType[],undefined>({
            query:()=>({
                url:"/users/getUsers",
                method:"get"
            }),providesTags: [{type:"users"}]
        }),
        setAdmin:builder.mutation<AuthResponseType,string>({
            query:(id)=>({
                url:  `/users/setadmin/${id}`,
                method:"put"
            }),invalidatesTags:["users"]
        }),
        dropAdmin:builder.mutation<AuthResponseType,string>({
            query:(id)=>({
                url:  `/users/dropadmin/${id}`,
                method:"put"
            }),invalidatesTags:["users"]
        }),
        createDepartment:builder.mutation<DepartmentResponseType,DepartmentAddType>({
            query:(data)=>({
                url:"/departments/createdepartment",
                method:"post",
                body:data
            }),invalidatesTags:["users", "departments"]
        }),
        getDepartments:builder.query<DepartmentResponseType[],undefined>({
            query:()=>({
                url:"/departments/getdepartments",
                method:"get",

            }),providesTags:[{type:"departments"}]
        }),
        createState:builder.mutation<any,DemografyCreateType>({
            query:(data)=>({
                url:"/demography/create",
                method:"post",
                body:data
            }),invalidatesTags:[{type:"states"}]
        }),
        getStates:builder.query<any,undefined>({
            query:()=>({
                url:"/demography/getstates",
                method:"get"
            }),providesTags:[{type:"states"}]
        }),
        linkDepartment:builder.mutation<any,{data:{name:string[]},id:string}>({
            query:(data)=>({
                url:`/users/adddepartments/${data.id}`,
                method: "put",
                body:{...data.data}
                
            }),invalidatesTags:[{type:"users"}]
        })
        
    })
    })
export const {useLinkDepartmentMutation,useGetStatesQuery,useCreateStateMutation,useGetDepartmentsQuery,useGetUsersQuery, useCreateDepartmentMutation,useLoginMutation,useSignUpMutation,useLogoutQuery, useSetAdminMutation,useDropAdminMutation}=apiSlice