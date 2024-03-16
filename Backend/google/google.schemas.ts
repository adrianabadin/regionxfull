import {z} from 'zod'

export const documentCreateSchema= z.object({
    body:z.object({
        title:z.string().min(3,{message:"El titulo debe tener al menos 3 letras"}),
        text:z.string().min(3,{message:"El texto debe tener al menos 3 letras"}),
        user:z.string().email({message:"Debes proveer un email valido"})
    })
    
})

export type DocumentCreateType=z.infer<typeof documentCreateSchema>["body"]