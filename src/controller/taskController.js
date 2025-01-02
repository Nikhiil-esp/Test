import statusCode from "http-status-codes"
import TaskModel from "../model/TaskModel.js"

const createTask =async(req,res)=>{

        try {
            const {taskName,taskAssignUser,Priority}=req.body

            if (!taskName || !taskAssignUser || !Priority) {
                return res.status(statusCode.BAD_GATEWAY).json({
                    message: "All filed are required..!"
                })
            }
            const {id} =req.user
            let task = await TaskModel.create({
                taskName,
                taskAssignUser,
                Priority,
                authorId:id
            })
            let Task = await TaskModel.findById(task._id)
            if (!Task) {
                return res.status(statusCode.BAD_GATEWAY).json({
                    message: "task not created"
                })
    
            }
            return res.status(statusCode.CREATED).json({
                message: "task created successfully",
                data: Task
            })
        } catch (error) {
            console.log(error.message)
    
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "internal server error",
            })
        }


}


const updateTask =async(req,res)=>{

    try {
           const {id} =req.params
        
        const user_id =req.user._id
           const {taskName,taskAssignUser,Priority}=req.body
        let Task = await TaskModel.findByIdAndUpdate(id,{
            $set:{
                taskName,
                taskAssignUser,
                Priority,
                authorId:user_id
            }
        })
        if (!Task) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "task not Updated"
            })

        }
        return res.status(statusCode.CREATED).json({
            message: "task Updated successfully",
            data: Task
        })
    } catch (error) {
        console.log(error.message)

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",
        })
    }


}



const deleteTask =async(req,res)=>{

    try {
           const {id} =req.params
        let Task = await TaskModel.findByIdAndDelete(id)
        if (!Task) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "task not deleted"
            })

        }
        return res.status(statusCode.CREATED).json({
            message: "task deleted successfully",
        })
    } catch (error) {
        console.log(error.message)

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",
        })
    }


}





const getAllTask =async(req,res)=>{
    try {
        let getAll = await TaskModel.find()
        if (!getAll) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "task list not found"
            })

        }
        return res.status(statusCode.CREATED).json({
            message: "task list found successfully",
            data: getAll
        })
        
    } catch (error) {
        console.log(error.message)

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",
        })
    }
}

export {
    getAllTask,
    deleteTask,
    updateTask,
    createTask
}