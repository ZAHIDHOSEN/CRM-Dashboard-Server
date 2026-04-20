import { Request, Response } from "express"
import { UserServices } from "./user.services"



const createUser = async(req:Request,res:Response)=>{
    try {
        const userData = req.body
        const result = await UserServices.createUser(userData)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}












export const UserController = {
   createUser
}