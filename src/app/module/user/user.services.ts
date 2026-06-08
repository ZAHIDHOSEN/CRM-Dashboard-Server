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




const updateUser = async(id:string,payload:Partial<IUser>)=>{

   const user = await User.findById(id)
   if(!user){
      throw new Error("User didnot exists in db")
   }

   const updatedUser = await User.findByIdAndUpdate(id,payload,
      {new:true,runValidators:true})


      return updatedUser
   
}



const deleteUser = async(id:string)=>{
   
  const user = await User.findByIdAndDelete(id)
  return user
}



const getAllUsers = async()=>{
   const allUsers = await User.find()
   const usersNumber = await User.countDocuments()

   return {
     allUsers,
     usersNumber
   }
}


const getMe = async(id:string)=>{
   const user = await User.findById(id)

   if(!user){
      throw new Error("user not found")
   }

   return user
}















export const UserServices = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getMe
}