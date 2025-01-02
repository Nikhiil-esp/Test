import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import userModel from "../model/userModel.js"

const AuthCheck =async(req,res,next)=>{
try {
        let token = req.headers.authorization?.replace("Bearer ","")
        if(!token){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message:"token not found"
            })
        }
          let decodeToken = await jwt.verify(token,String(process.env.ACCESS_TOKEN_KEY))
        if(!decodeToken){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message:"invalid token"
            })
        }
        let user = await userModel.findById(decodeToken.id).select("-token")
        req.user = user;
        next();
} catch (error) {
     console.log(error.message)
}
}

export default AuthCheck;