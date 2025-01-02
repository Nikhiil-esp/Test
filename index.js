import dotEnv from "dotenv"
dotEnv.config({path:"./.env"})
import app from "./src/App.js"
import DbCoonection from "./src/db/CoonectDb.js"

const port = parseInt(process.env.PORT_NUMBER)
DbCoonection()
.then((res)=>{
    app.listen(port,()=>{
        console.log(`srever is runing at port ${port}`)
    })
})
.catch((error)=>{
    console.log(`there are some error on server`)
})