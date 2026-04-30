import { IUser } from "./user.interface"
import { User } from "./user.model"
import bcrypt from "bcrypt"

const createUser = async (userData:IUser)=>{
   const {email,password} = userData
   const isUserExits = await User.findOne({email})

   if(isUserExits){
    throw new Error("user already exists")
   }

   const hashPassword = await bcrypt.hash(password as string,10)
   

   
   const user = await User.create(
   {
     ...userData,
    password: hashPassword,
   }
   )

   const result = user.toObject()
   delete result.password;

   return result 
    
}












export const UserServices = {
    createUser
}