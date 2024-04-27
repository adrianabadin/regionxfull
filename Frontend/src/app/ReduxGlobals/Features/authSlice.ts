import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { apiSlice, SignUpType } from "./apiSlice";
export interface AuthResponseType extends Omit<SignUpType,"password2"|"password">
{
    id:string
}
const initialState:AuthResponseType={
    lastname:"",
    name: "",
    username:"",
    id:""

}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      clearAuth:(_state)=>initialState  
    },
    extraReducers:(builder)=>{
        builder.addMatcher(apiSlice.endpoints.login.matchFulfilled,(state,action:PayloadAction<AuthResponseType>)=>{
            state.lastname=action.payload.lastname
            state.username=action.payload.username
            state.name=action.payload.name
            state.id=action.payload.id
        }),
        builder.addMatcher(apiSlice.endpoints.jwtLogin.matchFulfilled,(state,action:PayloadAction<AuthResponseType>)=>{
            state.lastname=action.payload.lastname
            state.username=action.payload.username
            state.name=action.payload.name
            state.id=action.payload.id
        })
    }
        
    
})
export const {clearAuth}=authSlice.actions