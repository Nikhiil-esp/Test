import express from "express"
import upload from "../Middeleware.js/MulterMiddleware.js"
import { getAllTaskCreateByUser, loginUser, LogoutUser, RegisterUser, updateUserPassword,getTaskListWithCustomSort } from "../controller/userController.js"
import AuthCheck from "../Middeleware.js/AuthMiddleware.js"

const userRouter = express.Router()
userRouter.post("/Register",upload.single("image"),RegisterUser)
userRouter.post("/Login",loginUser)
userRouter.post("/Logout",AuthCheck,LogoutUser)
userRouter.post("/UpdatePassword",AuthCheck,updateUserPassword)
userRouter.get("/allTask",AuthCheck,getAllTaskCreateByUser)
userRouter.get("/allTaskCustom",AuthCheck,getTaskListWithCustomSort)






export default userRouter