import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"


const createOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message:"password reset successfully",
        data: null


     })
})









export const OrganizationController ={
    createOrganization
}