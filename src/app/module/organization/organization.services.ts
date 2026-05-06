import { Types } from "mongoose"
import { User } from "../user/user.model"
import { IOrganization } from "./organization.interface"
import { Organization } from "./organization.model"
import { UserRole } from "../user/user.interface"




const createOrganization = async(payload:Partial<IOrganization>,adminId:Types.ObjectId)=>{
    
    const isExist = await Organization.findOne({name:payload.name})
    
    if(isExist){
        throw new Error("organization already exists")
    }

    // const allUsers = await User.find().select("_id");
    // const userIds = allUsers.map((user)=>user._id)
    


    const organization = await Organization.create({
        name: payload.name,
        admin: adminId,
        users: [adminId],
        branding:{
            logo:payload.branding?.logo,
            primaryColor:payload.branding?.primaryColor

        }
    })

    await User.findByIdAndUpdate(adminId, {
    organization: organization._id,
    role: UserRole.ADMIN,
  });

    return organization
}



const updateOrganization = async(payload:Partial<IOrganization>,id:string)=>{

    const organization = await Organization.findByIdAndUpdate(id,{
          name:payload.name,
          branding:{
            logo: payload.branding?.logo,
            primaryColor: payload.branding?.primaryColor
          }
    },{new:true,runValidators:true})

    return organization
}





const deleteOrganization = async(id:string)=>{
    
    const organization = await Organization.findByIdAndDelete(id)
     
    if(!organization){
        throw new Error("organization not found")
    }
    return organization
}


const getAllOrganization = async()=>{
    
    const organization = await Organization.find()

    return organization
}




const getSingleOrganization = async(id:string)=>{
    
    const organization = await Organization.findById(id)

    if(!organization){
        throw new Error("organization not found")
    }

    return organization
}



const getMyOrganization = async(userId:string)=>{
    const user = await User.findById(userId).populate("organization")

    if(!user || !user.organization){
        throw new Error("no organization found")
    }
}


const addUserToOrganization = async(id:string,userId:string)=>{
    
    const organization = await Organization.findById(id)
    if(!organization){
        throw new Error("organization not found")
    }

    const user = await User.findById(userId)
    if(!user){
        throw new Error("user not found")
    }

    if(organization.users.includes(user._id)){
        throw new Error("user already in organization")

    }

    organization.users.push(user._id)
    await organization.save()

    // update user

    user.organization = organization._id
    await user.save()

    return organization
}














export const OrganizationServices ={
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getAllOrganization,
    getSingleOrganization,
    getMyOrganization,
    addUserToOrganization
}