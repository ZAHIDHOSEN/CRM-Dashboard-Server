import { NextFunction, Request, Response } from "express";
import { LeadServices } from "./lead.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const createLead = async(req:Request,res:Response)=>{
    try {
        const leadData = req.body
        const assigned_to = req.user._id
        const payload = {...leadData,assigned_to}
        const result = await LeadServices.createLead(payload)

      res.status(201).json({
            success: true,
            message:"Lead created successfully",
            data:result
        })
    } catch (error:any) {
        console.log(error)
      res.status(400).json({
      success: false,
      message:error.message
    });
    }
}





const updateLeads = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const id = req.params.id as string;
     const payload = req.body
    
    const result = await LeadServices.updateLeads(id,payload)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Leads updated successfully",
        data: result


     })
})



const deleteLeads = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const id = req.params.id as string;
    
     await LeadServices.deleteLeads(id)
      
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Leads deleted successfully",
        data: null


     })
})

const getAllLeads = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const result = await LeadServices.getAllLeads()
    
    
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AllLeads get successfully",
        data: result


     })
})














export const LeadController = {
     createLead,
     updateLeads,
     deleteLeads,
     getAllLeads
}