import { IUser } from "./user.interface"
import { User } from "./user.model"


const createUser = async (userData:IUser)=>{
   const {email} = userData
   const isUserExits = await User.findOne({email})

   if(isUserExits){
    throw new Error("user already exists")
   }
   const result = await User.create(userData)

   return result 
    
}












export const UserServices = {
    createUser
}