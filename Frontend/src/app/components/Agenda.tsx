"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { z } from "zod";
import { metadata } from "../layout";
/**
 * 
 * @returns model Tasks {
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
export const TaskSchema = z.object({
  title: z.string().min(3, { message: "debe tener al menos 3 caracteres" }),
  flags: z.enum(["red", "yellow", "green"], {
    invalid_type_error: "debe ser red, yellow or green",
  }),
  departmentsId: z.string().uuid(),
  userId: z.string().uuid(),
  state: z.string().uuid(),
});
export type TaskType = z.infer<typeof TaskSchema>;
export default function TaskManager({
  tasks,
  filter,
}: {
  filter: string;
  tasks: TaskType[];
}) {
  return (
    <>
      <Card className="w-2/3 ">
        <Typography
          variant="h2"
          color="blue"
          className="font-bold font-sans m-3 text-center"
        >
          Agenda
        </Typography>
        <CardBody className="grid grid-cols-6">
          <Typography variant="h4" color="light-blue">
            Pendientes
          </Typography>
          {tasks.map((task) => (
            <Task task={task} key={Date.now()} />
          ))}
        </CardBody>
      </Card>
    </>
  );
}

function Task({ task }: { task: TaskType }) {
  return <></>;
}
