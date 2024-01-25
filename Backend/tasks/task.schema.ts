/**
 * model Tasks {
  id            String      @id @default(uuid())
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  title         String
  state         Demography  @relation(fields: [demographyId], references: [id])
  demographyId  String
  department    Departments @relation(fields: [departmentsId], references: [id])
  departmentsId String
  date          DateTime
  user          Users       @relation(fields: [userId], references: [id])
  userId        String
  flag          Flags

  @@index([demographyId])
  @@index([departmentsId])
  @@index([userId])
}
 */

import {z} from "zod"

export const TaskSchema=z.object({
  body:z.object({
    title:z.string().min(3,{message:"debe tener al menos 3 caracteres"}),
    state:z.string().min(3,{message:"debe tener al menos 3 caracteres"}),
    service:z.string().min(3,{message:"debe tener al menos 3 caracteres"}),
    username:z.string().email({message:"debe ser un email valido"}),
    flag:z.enum(["red","yellow","green"],{invalid_type_error:"El valor debe ser red, yellow o green"}),
    date:z.string().transform((str)=>new Date(str))})
})
export type TaskType=z.infer<typeof TaskSchema>["body"]