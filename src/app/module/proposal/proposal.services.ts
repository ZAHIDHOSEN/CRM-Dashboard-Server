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


const getSingleProposal = async (id: string) => {

  const result = await Proposal.findById(id)
    .populate("lead")
    .populate("client")
    .populate("createdBy")
    .populate("organization");

  return result;
};


const updateProposal = async (
  id: string,
  payload: Partial<IProposal>
) => {

  const result = await Proposal.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("lead")
    .populate("client")
    .populate("createdBy")
    .populate("organization");

  return result;
};



const deleteProposal = async (id: string) => {

  const result = await Proposal.findByIdAndDelete(id);

  return result;
};








export const ProposalServices = {
    createProposal,
    getAllProposal,
    getSingleProposal,
    updateProposal,
    deleteProposal
}