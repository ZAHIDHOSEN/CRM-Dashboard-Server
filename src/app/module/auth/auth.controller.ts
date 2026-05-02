import { Request, Response } from "express";
import { AuthServices } from "./auth.services";




const login = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body

        const result = await AuthServices.login(email,password)
        res.status(201).json({
            success: true,
            message:"login successfully",
            data:result
        })
    } catch (error) {
        console.log(error)
      res.status(400).json({
      success: false,
      message: "Login failed."
    });
    }
}














export const AuthController ={
    login
}