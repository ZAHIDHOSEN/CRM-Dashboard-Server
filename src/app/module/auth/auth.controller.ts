import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { setAuthCookie } from "../../utils/setCookie";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";

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



const resetPassword = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
  const payload = req.body
  const decodedToken = req.user

  await AuthServices.resetPassword(payload,decodedToken as JwtPayload)
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message:"password reset successfully",
        data: null


     })
})
















export const AuthController ={
    login,
    logOut,
    resetPassword
}