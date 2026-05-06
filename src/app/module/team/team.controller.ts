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


















export const TeamController = {
    createTeam
}