//import { docsManager } from "./google/google.service";
//docsManager.createDocument("Esto es el texto","Esto es el titulo").then(response=>console.log(response)).catch(error=>console.log(error))

import { SignUpSchema } from "./auth/auth.schema";

//docsManager.createDocumentDrive("Texto del cuerpo","titulo").then(response=>console.log(response)).catch(e=>console.log(e))
SignUpSchema.parse({body:JSON.parse('{"username": "aabadin@gmail.com","password":"11111111","name": "Adrian Daniel","lastname":"Abadin"}')})