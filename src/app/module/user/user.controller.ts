import { Request, Response } from "express"
import { UserServices } from "./user.services"



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












export const UserController = {
   createUser
}