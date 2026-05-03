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














export const OrganizationServices ={
    createOrganization
}