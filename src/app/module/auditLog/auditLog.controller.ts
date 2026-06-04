import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuditLogServices } from "./auditLog.services"


const createAuditLog = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const auditLog = req.body
    const user = req.user._id
    const payload = {
      ...req.body,
      user
    }
    const result = await AuditLogServices.createAuditLog(payload)
   
  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"AuditLog created successfully",
        data: result


     })
})

const getAllAuditLog = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
    const result = await AuditLogServices.getAllAuditLogs()
   
  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AuditLog get successfully",
        data: result


     })
})

const getSingleAuditLog = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const id = req.params.id as string
    const result = await AuditLogServices.getSingleAuditLog(id)
   
  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AuditLog get successfully",
        data: result


     })
})









export const AuditLogController = {
   createAuditLog,
   getAllAuditLog,
   getSingleAuditLog
}