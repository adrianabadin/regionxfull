import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import passport from "passport";
import { LoginSchema, SignUpSchema, validateSchemaMiddleware } from "./auth.schema";
import Session from 'express-session';
export const authRoutes=Router()
const authController= new AuthController();

authRoutes.post(
    "/signup",
    authController.spyMiddleware,
    validateSchemaMiddleware(SignUpSchema),
    passport.authenticate("register",{session:false,failureRedirect:"/login"}),
    authController.jwtCurrentUser,
    (req:Request,res:Response)=>{console.log(req.user);res.status(200).send(req.user)})
authRoutes.post(
    "/login",
    authController.spyMiddleware,
    validateSchemaMiddleware(LoginSchema),
    passport.authenticate("login",{session:false,failureRedirect:"/login"}),
    authController.jwtCurrentUser,
    (req:Request,res:Response)=>{
    console.log(req.user, "hizo login");
    res.status(200).send(req.user)})
authRoutes.get("/logout",(req:Request,res:Response,next:NextFunction)=>{
    req.logout((error)=>{if (error) next(error)
        res.status(200).send("Loged out")})
    })
 authRoutes.get(
    '/jwt',
    (req:Request,res:Response,next:NextFunction)=>{console.log(req.cookies);next()},
    passport.authenticate('jwt',{session:false}),
   authController.jwtCurrentUser,
(req:Request,res:Response)=>{
    console.log(req.user)
    res.status(200).send(req.user)
}
)

export default authRoutes
//(req:Request,res:Response,next:NextFunction)=>{res.status(200).send(req.body)},