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



// import { Request, Response, NextFunction } from "express";
// import httpStatus from "http-status";

// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";

// import { MessageService } from "./message.service";



// // send message
// const sendMessage = catchAsync(async (req: Request, res: Response) => {
//   const payload = {
//     ...req.body,
//     sender: req.user.userId,
//   };

//   const result = await MessageService.sendMessage(payload);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Message sent successfully",
//     data: result,
//   });
// });



// // get chat between users
// const getMessages = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.userId;
//   const targetId = req.params.userId;

//   const result = await MessageService.getMessages(userId, targetId);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Messages retrieved successfully",
//     data: result,
//   });
// });



// // mark as read
// const markAsRead = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const result = await MessageService.markAsRead(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Message marked as read",
//     data: result,
//   });
// });



// // inbox
// const getInbox = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.userId;

//   const result = await MessageService.getInbox(userId);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Inbox fetched successfully",
//     data: result,
//   });
// });

// export const MessageController = {
//   sendMessage,
//   getMessages,
//   markAsRead,
//   getInbox,
// };