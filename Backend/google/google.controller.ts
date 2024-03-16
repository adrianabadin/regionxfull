import { Request, Response } from "express";
import { logger } from "../Global.Services/logger";
import { GoogleService } from "./google.service";
import { DocumentCreateType } from "./google.schemas";

export class GoogleController {
    constructor(protected googleService=new GoogleService()){
this.createDocument=this.createDocument.bind(this);
    }
async createDocument (req:Request<any,any,DocumentCreateType>,res:Response){
    try{
       const response =await  this.googleService.createDocument(req.body.text,req.body.title,req.body.user)
       console.log(response,"controller")
       if (response) {
        res.status(200).send({id:response})
    return
    }
       else {res.status(500).json(response)
    return
    }
    }catch(error){
        logger.error({function:"GoogleController.createDocument",error})
        res.status(500).json(error)
    return
    }
}
}