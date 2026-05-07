import { IProposal } from "./proposal.interface"
import { Proposal } from "./proposal.model";


const createProposal = async(payload:Partial<IProposal>)=>{
   
    const proposalNumber = `PROP-${Date.now()}`
    payload.proposalNumber = proposalNumber;

    const result = await Proposal.create(payload)
    return result
}



const getAllProposal = async(query:Record<string,unknown>)=>{
  
    const result = await Proposal.find(query)
    .populate("lead")
    .populate("client")
    .populate("createdBy")
    .populate("organization");

    return result
}







export const ProposalServices = {
    createProposal,
    getAllProposal
}