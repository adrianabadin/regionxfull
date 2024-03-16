import {z} from "zod"
/**
 * model Strength {
  id             String        @id @default(uuid())
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  title          String
  description    String
  FODAstates     FODAstates?   @relation(fields: [fODAstatesId], references: [id])
  fODAstatesId   String?
  FODAservices   FODAservices? @relation(fields: [fODAservicesId], references: [id])
  fODAservicesId String?
}

 */
export const itemSchema=z.object({
title:z.string().min(3,{message:"El titulo debe tener al menos 3 caracteres"}),
description:z.string().min(3,{message:"La descripcion debe tener al menos 3 caracteres"})
})
export const fodaSchema= z.object({
    body:z.object({
        strengths:z.array(itemSchema).optional(),
        oportunities:z.array(itemSchema).optional(),
        weakneses:z.array(itemSchema).optional(),
        menaces:z.array(itemSchema).optional()
    })
})

export type FODA =  z.infer<typeof fodaSchema>