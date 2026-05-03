import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { OrganizationServices } from "./organization.services"


const createOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
    const payload = req.body
    const adminId = req.user._id
    const result = await OrganizationServices.createOrganization(payload,adminId)
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message:"password reset successfully",
        data: result


     })
})









export const OrganizationController ={
    createOrganization
}