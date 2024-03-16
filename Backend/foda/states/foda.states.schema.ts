import {z} from "zod"
import { fodaSchema } from "../foda.schema"

export const fodaStateSchema = fodaSchema.extend({
   body: fodaSchema.shape["body"].extend({state:z.string().min(3,{message:"El estado debe tener al menos 3 caracteres y ser el nombre del partido"})}) 
})
export const removeMemberSchema = z.object({
    query:z.object({
        member:z.enum(["strengths","menace","weakness","oportunity"]),
        title:z.string().min(3,{message:"Title must have at least 3 characters"}),
        state:z.string().min(3,{message:"State must have at least 3 characters"	})
    })
        
    
})
export type FODAstate = z.infer<typeof fodaStateSchema>
export type RemoveMember=z.infer<typeof removeMemberSchema>