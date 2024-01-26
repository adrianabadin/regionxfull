"use client";
import trash from "@/icons/trash.svg";
import edit from "@/icons/edit.svg";
import check from "@/icons/check.svg";
import {
  Button,
  Card,
  Input,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { z } from "zod";
import { metadata } from "../layout";
import {
  TasksResponseType,
  apiSlice,
  useGetDepartmentsQuery,
  useGetTasksQuery,
} from "../ReduxGlobals/Features/apiSlice";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../ReduxGlobals/store";
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
  date: z.string(),
  time: z.string(),
  department: z
    .string()
    .min(3, { message: "debe tener al menos 3 caracteres" }),
  username: z.string().email({ message: "debe ser un email valido" }),
  state: z.string().min(3, { message: "debe tener al menos 3 caracteres" }),
});
export type TaskType = z.infer<typeof TaskSchema>;
export default function TaskManager({
  // tasks,
  filter,
}: {
  filter: string;
  // tasks: TaskType[];
}) {
  const { data: tasks } = useGetTasksQuery({
    department: "Protesis",
    state: "Saladillo",
    username: "aabadin@gmail.com",
  });
  const { username } = useAppSelector((state) => state.auth);
  const [getDepartments] = apiSlice.endpoints.getDepartments.useLazyQuery();
  const [getStates] = apiSlice.endpoints.getStates.useLazyQuery();
  const [createTask, setCreateTask] = useState(false);
  const [departments, setDepartments] = useState<
    | {
        id: string;
        name: string;
        description: string;
      }[]
    | undefined
  >(undefined);
  const [states, setStates] = useState<
    | {
        state: string;
        description: string;
        politic: string;
        population: number;
      }[]
    | undefined
  >(undefined);
  const onCreate = () => {
    getDepartments({ username })
      .unwrap()
      .then((response) => {
        console.log(response);
        setDepartments(response);
        getStates(undefined)
          .unwrap()
          .then((data: any) => {
            setCreateTask(true);
            setStates(data);
            console.log(data);
          });
      });
  };
  return (
    <>
      <Card className="w-2/3 h-96 ">
        <Typography
          variant="h2"
          color="blue"
          className="font-bold font-sans m-3 text-center"
        >
          Agenda
        </Typography>
        <CardBody className="grid grid-cols-6">
          <Typography
            variant="h5"
            color="light-blue"
            className="col-span-6 mb-2"
          >
            Pendientes
          </Typography>
          <Typography variant="h6" color="gray" className="mx-auto">
            Fecha
          </Typography>
          <Typography variant="h6" color="gray" className="mx-auto">
            Hora
          </Typography>
          <Typography variant="h6" color="gray" className="mx-auto">
            Partido
          </Typography>
          <Typography variant="h6" color="gray" className="mx-auto">
            Programa
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="place-content-center items-center mx-auto"
          >
            Prioridad
          </Typography>

          {tasks !== undefined
            ? tasks.map((task) => <Task task={task} key={Date.now()} />)
            : null}
        </CardBody>
        <CardFooter className="flex h-full justify-end items-end">
          <Button onClick={onCreate} variant="gradient" color="blue">
            Agregar
          </Button>
        </CardFooter>
        <CreateTaskModal
          open={createTask}
          handler={() => setCreateTask((prev) => !prev)}
          departments={departments}
          states={states}
        />
      </Card>
    </>
  );
}

function Task({ task }: { task: TasksResponseType }) {
  return (
    <>
      <p className="col-start-1 mx-auto my-1">
        {new Date(task.date).toLocaleDateString()}
      </p>
      <p className="mx-auto my-1">{new Date(task.date).toLocaleTimeString()}</p>
      <p className="mx-auto my-1">{task.state.state}</p>
      <p className="mx-auto my-1">{task.department.name}</p>
      <div
        className={`rounded-full w-6 h-6 items-center mx-auto  my-1 ${
          task.flag === "red"
            ? "bg-red-500"
            : task.flag === "green"
            ? "bg-green-500"
            : "bg-yellow-500"
        }`}
      ></div>
      <div className="flex justify-around">
        <Image
          alt="Borrar"
          src={trash}
          width={24}
          height={24}
          className="bg-transparent hover:brightness-150 hover:scale-110 "
        />
        <Image
          alt="Editar"
          src={edit}
          width={24}
          height={24}
          className="bg-transparent hover:brightness-150 hover:scale-110 "
        />
        <Image
          alt="Cerrar"
          src={check}
          width={24}
          height={24}
          className="bg-transparent hover:brightness-150 hover:scale-110 "
        />
      </div>
    </>
  );
}

function CreateTaskModal({
  open,
  handler,
  states,
  departments,
}: {
  open: boolean;
  handler: (...args: any) => void;
  states?: {
    state: string;
    description: string;
    politic: string;
    population: number;
  }[];
  departments?: { id: string; name: string; description: string }[];
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<TaskType>({ resolver: zodResolver(TaskSchema), mode: "onBlur" });
  if (states == undefined || departments == undefined) return;
  return (
    <Dialog open={open} handler={handler} placeholder={null}>
      <DialogHeader className="flex justify-between">
        <Typography variant="h3" color="blue">
          Crear Tarea
        </Typography>
        <Button variant="gradient" color="white" onClick={handler}>
          Cerrar
        </Button>
      </DialogHeader>
      <DialogBody className="flex flex-col">
        <Input
          crossOrigin={undefined}
          {...register("title")}
          variant="static"
          label="Titulo"
          error={errors.title ? true : undefined}
        />
        {errors.title ? (
          <p className="text-red-500 text-center">{errors.title.message}</p>
        ) : null}
        <div className="flex justify-between mt-2">
          <Input {...register("date")} type="date" variant="static" />
          <Input {...register("time")} type="time" variant="static" />
        </div>
        <div className="flex justify-between mt-2">
          <Controller
            name="flags"
            control={control}
            render={({ field }) => (
              <Select
                variant="static"
                className="mr-2"
                {...field}
                onChange={(value) => field.onChange(value)}
              >
                <Option
                  value="red"
                  className="bg-red-500 text-white focus:bg-red-700 focus:text-gray-300 hover:bg-red-700"
                >
                  Rojo
                </Option>
                <Option
                  value="yellow"
                  className="bg-yellow-500 text-white focus:bg-yellow-700 focus:text-gray-300 hover:bg-yellow-700"
                >
                  Amarillo
                </Option>
                <Option
                  value="green"
                  className="bg-green-500 text-white focus:bg-green-700 focus:text-gray-300 hover:bg-green-700"
                >
                  Verde
                </Option>
              </Select>
            )}
          ></Controller>
          <Select variant="static" className="mr-2" {...register("department")}>
            {departments !== undefined
              ? departments.map((item) => (
                  <Option key={item.id}>{item.name}</Option>
                ))
              : null}
          </Select>
          <Select variant="static" className="mr-2" {...register("state")}>
            {states !== undefined
              ? states.map((item) => (
                  <Option key={item.state}>{item.state}</Option>
                ))
              : null}
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue">
          Agregar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
