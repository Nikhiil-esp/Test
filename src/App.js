import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(express.static("Public"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))


//Routes
import userRouter from "./Router/userRouter.js"
import TaskRouter from "./Router/taskRouter.js"
app.use("/user",userRouter)
app.use("/task",TaskRouter)

export default app;