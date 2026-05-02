import { IUser } from "../user/user.interface"
import bcrypt from "bcrypt"
import { User } from "../user/user.model"


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
  
    const userObj = user.toObject()
    delete userObj.password
   

    return {
        user:userObj
    }


}











export const AuthServices ={
    login
}