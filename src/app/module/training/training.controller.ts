import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { TrainingServices } from "./training.servics"



const createTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   
  const result = await TrainingServices.createTraining(req.body)

 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"Training created successfully",
        data: result


     })
})


const getAllTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   
  const result = await TrainingServices.createTraining(req.query)

 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"Training get successfully",
        data: result


     })
})











export const TrainingController = {
   createTraining,
   getAllTraining
}