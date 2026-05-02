import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { setAuthCookie } from "../../utils/setCookie";


const isProduction = process.env.NODE_ENV === "production"



const login = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body

        const result = await AuthServices.login(email,password)
        setAuthCookie(res,result)
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



const logOut = async(req:Request,res:Response)=>{
    try {
    res.clearCookie("accessToken",{
    httpOnly:true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as "none" | "lax",

   })
   res.clearCookie("refreshToken",{
    httpOnly:true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
   })

   res.status(401).json({
    success:true,
    message:"logout successfully completed"
   })

   
    } catch (error) {
        console.log(error)
      res.status(400).json({
      success: false,
      message: "Logout failed."
    });
    }
}

















export const AuthController ={
    login,
    logOut
}