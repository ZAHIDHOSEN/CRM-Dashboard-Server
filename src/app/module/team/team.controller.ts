import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { TeamServices } from "./team.services"


const createTeam = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const payload = req.body
     const orgId = req.user.organization
     const result = await TeamServices.createTeam(payload,orgId)
  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"Team created successfully",
        data: result


     })
})


const updateTeam = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const id = req.params.id as string;
     const payload = req.body
    
     const result = await TeamServices.updateTeam(id,payload)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Team updated successfully",
        data: result


     })
})



const deleteTeam = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const id = req.params.id as string;
    
    
      await TeamServices.deleteTeam(id)
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Team deleted successfully",
        data: null


     })
})

const getAllTeam = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
    const result = await TeamServices.getAllTeam()
     
    
    
  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AllTeam get successfully",
        data: result


     })
})
























export const TeamController = {
    createTeam,
    updateTeam,
    deleteTeam
}