import { Router } from "express";
import { TaskController } from "./task.controller";
const taskRouter=Router()
const taskController=new TaskController()
taskRouter.post("/create",taskController.createTask)
taskRouter.get("/getTasks",taskController.getTasksByDepartment)
export default taskRouter