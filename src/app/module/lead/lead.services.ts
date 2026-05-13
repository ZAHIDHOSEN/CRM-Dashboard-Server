import { ILead } from "./lead.interface"
import { Lead } from "./lead.model"



const createLead = async (payload:ILead)=>{
  const {name} = payload
  const isLeadExits = await Lead.findOne({name})

  if(isLeadExits){
    throw new Error("this name lead already exists")
  }

  const result = await Lead.create(payload)

  return result

    
}












export const LeadServices = {
    createLead
}