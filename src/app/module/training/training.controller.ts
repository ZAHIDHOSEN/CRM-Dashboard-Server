import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { TrainingServices } from "./training.servics"
import { UserRole } from "../user/user.interface"



const createTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   const createdBy = req.user._id
   const payload = {
    ...req.body,
    createdBy
   }
  const result = await TrainingServices.createTraining(payload)

 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"Training created successfully",
        data: result


     })
})


const getAllTraining = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   
  const result = await TrainingServices.getAllTraining(req.query)

 
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


const getTrainingByRole = catchAsync(async ( req: Request,res: Response,next: NextFunction) => {

   //  const { role } = req.params;
   const role = req.user.role;

    const result =
      await TrainingServices.getTrainingByRole(
        role as UserRole
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:"Role based trainings retrieved successfully",
      data: result,
    });
  }
);




const getPublishedTrainings =catchAsync(async (req:Request,res:Response, next:NextFunction) => {

      const result = await TrainingServices.getPublishedTrainings();

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"Published trainings retrieved successfully",
        data: result,
      });
    }
  );



  const togglePublishTraining =catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const { id } = req.params;

      const result = await TrainingServices.togglePublishTraining( id as string);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"Training publish status updated successfully",
        data: result,
      });
    }
  );








const submitQuiz = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const result =await TrainingServices.submitQuiz( id as string,req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:"Quiz submitted successfully",
      data: result,
    });
  }
);











export const TrainingController = {
   createTraining,
   getAllTraining,
   getSingleTraining,
   deleteTraining,
   updateTraining,
   getTrainingByRole,
   getPublishedTrainings,
   togglePublishTraining,
   submitQuiz
}