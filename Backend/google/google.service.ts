//import docs from "@googleapis/docs"
import {Auth, google} from "googleapis"
import { logger } from "../Global.Services/logger"
import { DocumentCreateError, DocumentUpdateError, GoogleError, UnknownGoogleError, invalidCredentials } from './google.errors';
import fs from 'fs';

export class GoogleService {
static authClient:Auth.GoogleAuth  |undefined
    constructor(){
this.createDocument=this.createDocument.bind(this);
    }
    /**
     * 
     * "https://mail.google.com/",
     * "https://www.googleapis.com/auth/calendar",
     */
    async initiateService(){
const datab= await fs.promises.readFile("./rsx.json", "utf8");
console.log(datab)
        const authClient= new google.auth.GoogleAuth({
            keyFilename:"./rsx.json",
            scopes:
                [             
                "https://www.googleapis.com/auth/documents",'https://www.googleapis.com/auth/drive']})
        GoogleService.authClient =  authClient
    }
      
    async createDocument(text:string,title:string,user:string){
        try{
            if (GoogleService.authClient === undefined) await this.initiateService()
            const client= google.docs({version:"v1", auth:GoogleService.authClient})
            const drive= google.drive({version:"v3", auth:GoogleService.authClient})
            //const client = docs.docs({version:"v1",auth:GoogleService.authClient})
        const document= await client.documents.create({  requestBody:{body:{content:[{paragraph:{elements:[{textRun:{ content:text}}]}}]}, title}})
        console.log(document.data)
        if (document.data.documentId !== undefined && document.data.documentId !==null){
            const updatedDocument = await client.documents.batchUpdate(
                {
                    documentId:document.data.documentId,
                    requestBody:{
                        requests:[{
                            insertText:{endOfSegmentLocation:{},text:title+"\n"}
                        },
                        {
                            updateTextStyle:{range:{startIndex:1,endIndex:title.length+2},textStyle:{bold:true},fields:'bold'}
                        },
                        {
                            updateTextStyle:{range:{startIndex:1,endIndex:title.length+2},textStyle:{fontSize:{magnitude:16,unit:'PT'}},fields:'fontSize'}
                        },
                        {
                            insertText:{endOfSegmentLocation:{},text:text+"\n\n"},
                            
                        },{updateTextStyle:{range:{startIndex:title.length+2,endIndex:title.length+2+text.length+2},textStyle:{fontSize:{magnitude:12,unit:'PT'}},fields:'fontSize'}}]
                    }
                })
if (updatedDocument.data.documentId !== undefined&& updatedDocument.data.documentId!==null) {
    await drive.permissions.create({fileId:updatedDocument.data.documentId,requestBody:{
        role:"writer",
        type:"user",
        emailAddress:user
    }})      
    const documents=await client.documents.get({documentId:updatedDocument.data.documentId})
                console.log(updatedDocument.data,"insert",documents.data.body,"texto",documents.data.body?.content)
            }else throw new DocumentUpdateError()
                if (updatedDocument.data.documentId !== undefined) return updatedDocument.data.documentId
                else throw new DocumentUpdateError()
            }else throw new DocumentCreateError()    
        }catch(error){
            let parsedError =invalidCredentials(error as Error)    
        if ( parsedError instanceof GoogleError) {
            logger.error({function:"GoogleService.createDocument",error:parsedError})
            return parsedError}
            if (error instanceof GoogleError){
                logger.error({function:"GoogleService.createDocument",error})
                return error
            } else {
                logger.error({function:"GoogleService.createDocument",error:new UnknownGoogleError(error)})
                return new UnknownGoogleError(error)}
        }
    }
}
export const docsManager= new GoogleService()