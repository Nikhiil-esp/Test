import express from "express"
import AuthCheck from "../Middeleware.js/AuthMiddleware.js"
import { createTask, deleteTask, getAllTask, updateTask } from "../controller/taskController.js"
const TaskRouter = express.Router()
TaskRouter.post("/create",AuthCheck,createTask)
TaskRouter.patch("/update/:id",AuthCheck,updateTask)
TaskRouter.get("/GetAll",AuthCheck,getAllTask)
TaskRouter.delete("/delete/:id",AuthCheck,deleteTask)


export default TaskRouter;