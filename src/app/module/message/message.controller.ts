import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { MessageServices } from "./message.services"



const sendMessage = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
     const payload = {
        ...req.body,
        sender:req.user._id
     }

     const result = await MessageServices.sendMessage(payload)

  
 
     sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"Team send successfully",
        data: result


     })
})


const getChatHistory = catchAsync(async (req: Request, res: Response) => {
  const { partnerId, organizationId } = req.params;
  const userId = req.user._id;

  const result = await MessageServices.getMessages(
    userId as string,
    partnerId as string,
    organizationId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Chat history retrieved successfully",
    data: result,
  });
});









export const MessageController = {
   sendMessage,
   getChatHistory
}