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
        statusCode: httpStatus.OK,
        message:"Training get successfully",
        data: result


     })
})




const getSingleTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
  const id = req.params.id as string
  const result = await TrainingServices.getSingleTraining(id)

 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Training get successfully",
        data: result


     })
})


const deleteTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
  const id = req.params.id as string
  const result = await TrainingServices.deleteTraining(id)

 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Training delete successfully",
        data: null


     })
})

const updateTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
  const id = req.params.id as string
  const payload = req.body
  const result = await TrainingServices.updateTraining(id,payload)

 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Training updated successfully",
        data: result


     })
})











export const TrainingController = {
   createTraining,
   getAllTraining,
   getSingleTraining,
   deleteTraining,
   updateTraining
}