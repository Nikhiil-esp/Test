import express from "express"
import upload from "../Middeleware.js/MulterMiddleware.js"
import { loginUser, LogoutUser, RegisterUser, updateUserPassword } from "../controller/userController.js"
import AuthCheck from "../Middeleware.js/AuthMiddleware.js"

const userRouter = express.Router()
userRouter.post("/Register",upload.single("image"),RegisterUser)
userRouter.post("/Login",loginUser)
userRouter.post("/Logout",AuthCheck,LogoutUser)
userRouter.post("/UpdatePassword",AuthCheck,updateUserPassword)




export default userRouter