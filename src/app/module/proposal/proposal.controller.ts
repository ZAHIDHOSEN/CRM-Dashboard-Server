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









export const ProposalController = {
    createProposal,
    getAllProposal
}