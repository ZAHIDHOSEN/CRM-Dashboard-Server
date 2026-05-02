import { Response } from "express"


export interface AuthToken {
    accessToken  ?: string
     refreshToken ?: string
}

 const isProduction = process.env.NODE_ENV === "production"

export const setAuthCookie = (res:Response,tokenInfo:AuthToken)=>{
    if(tokenInfo.accessToken){
        res.cookie("accessToken",tokenInfo.accessToken,{
         httpOnly:true,
         secure: isProduction, //process.env.NODE_ENV === "production",
         sameSite:(isProduction ? "none" : "lax") as "none" | "lax",
        })
    }

    if(tokenInfo.refreshToken){
        res.cookie("refreshToken",tokenInfo.refreshToken,{
            httpOnly:true,
            secure:isProduction,
            sameSite:(isProduction ? "none" : "lax") as "none" | "lax",
            
        })
    }
}