import { Organization } from "../organization/organization.model"
import { ITeam } from "./team.interface"
import { Team } from "./team.model"




const createTeam = async(payload:Partial<ITeam>,orgId:string)=>{

   const isTeamExits = await Team.findOne({name:payload.name})
   if(isTeamExits){
      throw new Error("Team already exists")
   }

   // const organizations = await Organization.findById(orgId).populate("name")

   const newTeam = await Team.create({
      name:payload.name,
      leader:payload.leader,
      // organization:orgId,
      organization:payload.organization,
      members:payload.members
   })

  

   return await newTeam.populate("leader","name email")

}



const updateTeam = async(id:string,payload:Partial<ITeam>)=>{

   const team = await Team.findById(id)
   if(!team){
      throw new Error("Team didnot exists in db")
   }

   const updatedTeam = await Team.findByIdAndUpdate(id,payload,
      {new:true,runValidators:true})

      return updatedTeam
   
}



const deleteTeam = async(id:string)=>{
   
  const result = await Team.findByIdAndDelete(id)
  return result
}



const getAllTeam = async()=>{
   const allTeam = await Team.find()
   const teamNumber = await Team.countDocuments()

   return {
      allTeam,
      teamNumber
   }
}


const getSingleTeam = async(id:string)=>{
   const team = await Team.findById(id)

   if(!team){
      throw new Error("team not found")
   }

   return team
}
  















export const TeamServices = {
   createTeam,
   updateTeam,
   deleteTeam,
   getAllTeam,
   getSingleTeam
}