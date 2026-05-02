import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import { createToken } from "../../utils/jwt"
import bcrypt from "bcrypt"
import { JwtPayload } from "jsonwebtoken"

const login = async(email:string,password:string)=>{
  
    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new Error("user not found. Please register")

    }

    const dbPassword = user.password as string

    const comparePassword = await bcrypt.compare(password,dbPassword)

    if(!comparePassword){
        throw new Error("password does not match")
    }

    const jwtPayload = {
        _id:user._id,
        email:user.email,
        role:user.role
    }
  
    const userWithOutPassword = user.toObject()
    delete userWithOutPassword.password


   
    const accessToken = createToken(jwtPayload,process.env.JWT_ACCESS_SECRET as string,process.env.JWT_ACCESS_EXPIRES as string)
    const refreshToken = createToken(jwtPayload,process.env.JWT_REFRESH_SECRET as string,process.env.JWT_REFRESH_EXPIRES as string)
   

    return {
        userWithOutPassword,
        accessToken,
        refreshToken
    }


}


const resetPassword = async( payload:Record<string,any>,decodedToken:JwtPayload) => {
   if(payload.id != decodedToken.userId){
    throw new Error("you can't reset password")
   }

   const isUserExit = await User.findById(decodedToken.userId)
    if(!isUserExit){
      throw new Error("user does not exists")
    }  
    
    const hashPassword = await bcrypt.hash(
      payload.newPassword,
      Number(10)
    )

    isUserExit.password = hashPassword

    await isUserExit.save()
     

}











export const AuthServices ={
    login,
    resetPassword
}