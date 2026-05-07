import { Types } from "mongoose"
import { Organization } from "../organization/organization.model"
import { User } from "../user/user.model"
import { ITeam } from "./team.interface"
import { Team } from "./team.model"




const createTeam = async(payload:Partial<ITeam>,orgId:string)=>{

   const isTeamExits = await Team.findOne({name:payload.name})
   if(isTeamExits){
      throw new Error("Team already exists")
   }

   const leader = await User.findById(payload.leader)
   if(!leader){
      throw new Error("leader not found")
   }

   // const organizations = await Organization.findById(orgId).populate("name")

   const newTeam = await Team.create({
      name:payload.name,
      leader:payload.leader,
      // organization:orgId,
      organization:payload.organization,
      members:payload.members || []
   })

  
    return newTeam
   // return await newTeam.populate("leader","name email")

}



const updateTeam = async(id:string,payload:Partial<ITeam>)=>{

   const team = await Team.findById(id)
   if(!team){
      throw new Error("Team didnot exists in db")
   }

   if(payload.leader){
      const leader = await User.findById(payload.leader)
      if(!leader){
         throw new Error("leader not found")
      }
   }

   if(payload.members?.length){
      const members = await User.find({
         _id:{
            $in:payload.members,
         }
      })

      if(members.length !== payload.members.length){
         throw new Error("some members not found")
      }
   }

   const updatedTeam = await Team.findByIdAndUpdate(id,payload,
      {new:true,runValidators:true}).populate("leader").populate("members")


      return updatedTeam
   
}



const deleteTeam = async(id:string)=>{
   
  const team = await Team.findByIdAndDelete(id)
  return team
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
   const team = await Team.findById(id).populate("leader").populate("members")

   if(!team){
      throw new Error("team not found")
   }

   return team
}



// add members

const addMemberToTeam = async (
  teamId: string,
  userId: string
) => {

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // prevent duplicate
  const alreadyMember = team.members.includes(
    new Types.ObjectId(userId)
  );

  if (alreadyMember) {
    throw new Error("User already exists in team");
  }

  team.members.push(new Types.ObjectId(userId));

  await team.save();

  return team;
};


// remove member to team


const removeMemberFromTeam = async (
  teamId: string,
  userId: string
) => {

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found");
  }

  team.members = team.members.filter(
    (memberId: Types.ObjectId) =>
      memberId.toString() !== userId
  );

  await team.save();

  return team;
};

  















export const TeamServices = {
   createTeam,
   updateTeam,
   deleteTeam,
   getAllTeam,
   getSingleTeam,
   addMemberToTeam,
   removeMemberFromTeam
}