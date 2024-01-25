import { Router } from "express";
import { TaskController } from "./task.controller";
const taskRouter=Router()
const taskController=new TaskController()
taskRouter.post("/create",taskController.createTask)
taskRouter.get("/getTasksByDepartment",taskController.getTasksByDepartment)
taskRouter.get("/getTasksByState",taskController.getTasksByState)
taskRouter.get("/getTasksByUserName",taskController.getTasksByUsername)

export default taskRouter