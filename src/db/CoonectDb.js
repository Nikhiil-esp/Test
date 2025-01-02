import mongoose from "mongoose";
import { data_base_name } from "../Constant.js";


const DbConnection =async()=>{
    try {
        let result = await mongoose.connect(`${process.env.MONGODB_URL}/${data_base_name}`)
        console.log("dataBase is connected successfully.." + result.connection.host)
    } catch (error) {
        console.log(error.message,"connection error")
        throw error
    }
}

export default DbConnection;