import { IUser } from "./user.interface"
import { User } from "./user.module"


const createUser = async (userData:IUser)=>{
   const {email,downline} = userData
   const isUserExits = await User.findOne({email})

   if(isUserExits){
    throw new Error("user already exists")
   }

   if(downline?.referralCode){

     const isCodeTaken = await User.findOne({"downline.referralCode":downline.referralCode})
     if(isCodeTaken){
        throw new Error("Referrel code is already used")
     }
   }

   const result = await User.create(userData)

   return result 
    
}












export const UserServices = {
    createUser
}