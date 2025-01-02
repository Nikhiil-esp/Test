import statusCode from "http-status-codes"
import userModel from "../model/userModel.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"



const generateToken = async (userId) => {
    let user = await userModel.findById(userId)
    let AccessToken = await user.GenerateAccessToke()
    let RefreshToken = await user.GenerateRefreshToke()
    user.token = RefreshToken
    await user.save({ validateBeforeSave: false })
    return { AccessToken, RefreshToken }
}

const RegisterUser = async (req, res) => {
    try {
        const { name, email, address, phone, password } = req.body
        if (!name || !email || !address || !phone || !password) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "All filed are required..!"
            })
        }
        let isUserExists = await userModel.findOne({
            $or: [{ name }, { email }]
        })
        if (isUserExists) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "Name and email already exists!"
            })
        }
        let userImage;
        if (req.file.originalname.length > 0) {
            userImage = req.file.originalname

        }
        if (!userImage) {
            return res.status(statusCode.BAD_REQUEST)
                .json({
                    message: "image file is required.."
                })
        }
        let user = await userModel.create({
            name,
            email,
            password,
            phone,
            address,
            image: userImage
        })
        let result = await userModel.findById(user._id).select("-password")
        if (!result) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "user not created"
            })

        }
        return res.status(statusCode.CREATED).json({
            message: "user created successfully",
            data: result
        })
    } catch (error) {
        console.log(error.message)

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",
            data: result
        })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "all filed are required..!"
            })
        }
        let IsExists = await userModel.findOne({ email })
        if (!IsExists) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "email not found  "
            })
        }
        let CheckPassword = await IsExists.IsPasswordCheck(password)
        if (!CheckPassword) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "password not match..!"
            })
        }

        let { AccessToken, RefreshToken } = await generateToken(IsExists._id);

        const options = {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
        };

        return res
            .status(statusCode.OK)
            .cookie("AccessToken", AccessToken, options)
            .cookie("RefreshToken", RefreshToken, options)
            .json({
                message: "Login Successfully",
                data: IsExists,
                AccessToken,
                RefreshToken,
            });

    } catch (error) {
        console.log(error.message)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",

        })
    }
}



const LogoutUser = async (req, res) => {
    try {
        const { id } = req.user
        let userLogout = await userModel.findByIdAndUpdate(id, {
            $set: {
                token: ""
            }
        })
        if (!userLogout) {
            return res.status(statusCode.BAD_REQUEST).json({
                message: "some issue while logout"
            })
        }
        return res.status(statusCode.OK).json({
            message: "logout successfully"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",

        })
    }
}


const updateUserPassword = async (req, res) => {
    try {
        const { id } = req.user
        const user = await userModel.findById(id);

        if (!user) {
          return res.status(statusCode.NOT_FOUND).json({
            message: "User not found!",
          });
        }
        const { password, newPassword, confirmPassword } = req.body
        if (!password || !newPassword || !confirmPassword) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "All filed are required..!"
            })
        }
        if (newPassword != confirmPassword) {
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "password and confirm password should be match"
            })
        }
        let checkPassword  = await user.IsPasswordCheck(password)
        if(!checkPassword){
            return res.status(statusCode.BAD_GATEWAY).json({
                message: "password not match"
            })
        }
        user.password =newPassword
        await user.save({validateBeforeSave:false})
        return res.status(statusCode.OK).json({
            message: "password update successfully"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "internal server error",

        })
    }
}

export {
    RegisterUser,
    loginUser,
    LogoutUser,
    updateUserPassword
}


