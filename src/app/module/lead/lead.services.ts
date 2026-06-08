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



const updateLeads = async(id:string,payload:Partial<ILead>)=>{
  const leads = await Lead.findById(id)

  if(!leads){
     throw new Error("Leads not found")
  }

  const updatedLeads = await Lead.findByIdAndUpdate(id,payload,{new:true,runValidators:true})

  return updatedLeads

}


const deleteLeads = async(id:string)=>{
  const result = await Lead.findByIdAndDelete(id)
  return result 
}

const getAllLeads = async()=>{
  const result = await Lead.find()
  return result
}












export const LeadServices = {
    createLead,
    updateLeads,
    deleteLeads,
    getAllLeads
}