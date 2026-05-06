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
      organization:orgId,
      members:payload.members
   })

  

   return await newTeam.populate("leader","name email")

}
  















export const TeamServices = {
   createTeam
}