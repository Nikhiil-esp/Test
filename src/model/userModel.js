import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next
    }
    this.password = await bcrypt.hash(this.password,10)
})


userSchema.methods.IsPasswordCheck = async function (password) {
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.GenerateAccessToke = async function() {
    return await jwt.sign({
        id:this._id
    },process.env.ACCESS_TOKEN_KEY,{expiresIn:"1d"})
}


userSchema.methods.GenerateRefreshToke = async function() {
    return await jwt.sign({
        id:this._id
    },process.env.REFRESH_TOKEN_KEY,{expiresIn:"10d"})
}
console.log("nikhil")
console.log("arajput")
const userModel = mongoose.model("user",userSchema)
export default userModel