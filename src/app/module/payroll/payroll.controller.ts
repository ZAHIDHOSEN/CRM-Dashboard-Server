import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { PayrollServices } from "./payroll.services"


const createPayroll = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const payload = req.body
   
   const result = await PayrollServices.createPayroll(payload)
  
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"payroll created successfully",
        data: result


     })
})



const getAllPayroll = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
   
   const query = req.query
   const result = await PayrollServices.getAllPayroll(query)
  
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"AllPayroll get successfully",
        data: result


     })
})




const getSinglePayroll = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
    const id = req.params.id as string
   
   const result = await PayrollServices.getSinglePayroll(id)
  
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"SinglePayroll get successfully",
        data: result


     })
})





















export const PayrollController = {
   createPayroll,
   getAllPayroll,
   getSinglePayroll
} 