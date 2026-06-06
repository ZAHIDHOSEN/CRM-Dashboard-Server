import { NextFunction, Request, Response } from "express"
import { UserServices } from "./user.services"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"


const createUser = async(req:Request,res:Response)=>{
    try {
        const userData = req.body
        console.log(userData)
        const result = await UserServices.createUser(userData)
        res.status(201).json({
            success: true,
            message:"user created successfully",
            data:result
        })
    } catch (error:any) {
        console.log(error)
      res.status(400).json({
      success: false,
      message: error.message
    });
    }
}



const updateUser = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const id = req.params.id as string;
     const payload = req.body
    
    const result = await UserServices.updateUser(id,payload)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"User updated successfully",
        data: result 


     })
})



const deleteUser = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const id = req.params.id as string;
    
     await UserServices.deleteUser(id)
      
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"User deleted successfully",
        data: null


     })
})

const getAllUsers = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    

     const result = await UserServices.getAllUsers()
    
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AllUsers get successfully",
        data: result 


     })
})


const getMe = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const id = req.params.id as string
    
     
    
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"User get successfully",
        data: {}


     })
})












export const UserController = {
   createUser,
   updateUser,
   deleteUser,
   getAllUsers,
   getMe
}