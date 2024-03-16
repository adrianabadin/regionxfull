import {z} from "zod"
import { fodaSchema } from "../foda.schema"

export const fodaServiceSchema = fodaSchema.extend({
   body:fodaSchema.shape["body"].extend({service:z.string().min(3,{message:"El servicio debe tener al menos 3 caracteres y ser el nombre del servicio"})}) 
})
export const removeMemberSchema=z.object({
   query:z.object({
      service:z.string().min(3,{message:"El servicio debe tener al menos 3 caracteres"}),
      member:z.enum(["strength","menace","weakness","oportunity"]),
      title:z.string().min(3,{message:"Title must have at least 3 characters"})

   })
})
export type FODAservice = z.infer<typeof fodaServiceSchema>
export type RemoveServiceMember = z.infer<typeof removeMemberSchema>