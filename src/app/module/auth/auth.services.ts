import { IUser } from "../user/user.interface"
import bcrypt from "bcrypt"
import { User } from "../user/user.model"
import { createToken } from "../../utils/jwt"


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











export const AuthServices ={
    login
}