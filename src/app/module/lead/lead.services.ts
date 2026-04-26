import { ILead } from "./lead.interface"
import { Lead } from "./lead.model"



const createLead = async (leadData:ILead)=>{
  const {name} = leadData

  if(name){
    throw new Error("this name lead already exists")
  }

  const result = await Lead.create(leadData)

  return result

    
}












export const LeadServices = {
    createLead
}