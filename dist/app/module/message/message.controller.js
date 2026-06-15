"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const message_services_1 = require("./message.services");
const sendMessage = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign(Object.assign({}, req.body), { sender: req.user._id });
    const result = yield message_services_1.MessageServices.sendMessage(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Team send successfully",
        data: result
    });
}));
const getChatHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { partnerId, organizationId } = req.params;
    const userId = req.user._id;
    const result = yield message_services_1.MessageServices.getMessages(userId, partnerId, organizationId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Chat history retrieved successfully",
        data: result,
    });
}));
exports.MessageController = {
    sendMessage,
    getChatHistory
};
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
