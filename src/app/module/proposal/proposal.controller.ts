import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { ProposalServices } from "./proposal.services"


const createProposal = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const payload = req.body
    const result = await ProposalServices.createProposal(payload)
   
  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"proposal created successfully",
        data: result


     })
})



const getAllProposal = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
  const query = req.query  
  const result = await ProposalServices.getAllProposal(query)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AllProposal get successfully",
        data: result


     })
})


const getSingleProposal = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   const id = req.params.id as string
   const result = await ProposalServices.getSingleProposal(id)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"SingleProposal get successfully",
        data: result


     })
})

const updateProposal = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   const id = req.params.id as string
   const payload = req.body;
   const result = await ProposalServices.updateProposal(id,payload)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Proposal updated successfully",
        data: result


     })
})


const deleteProposal = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   const id = req.params.id as string
  
    await ProposalServices.deleteProposal(id)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Proposal deleted successfully",
        data: null


     })
})









export const ProposalController = {
    createProposal,
    getAllProposal,
    getSingleProposal,
    updateProposal,
    deleteProposal
}