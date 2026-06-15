"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoute = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("../user/user.interface");
const message_controller_1 = require("./message.controller");
const router = (0, express_1.Router)();
router.post("/send-message", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), message_controller_1.MessageController.sendMessage);
router.get("/:organizationId/:partnerId", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), message_controller_1.MessageController.getChatHistory);
exports.MessageRoute = router;
// import { Router } from "express";
// import { MessageController } from "./message.controller";
// import { checkAuth } from "../../middleware/authMiddleware";
// const router = Router();
// // send message
// router.post(
//   "/",
//   checkAuth(),
//   MessageController.sendMessage
// );
// // inbox
// router.get(
//   "/inbox",
//   checkAuth(),
//   MessageController.getInbox
// );
// // chat between users
// router.get(
//   "/:userId",
//   checkAuth(),
//   MessageController.getMessages
// );
// // mark as read
// router.patch(
//   "/read/:id",
//   checkAuth(),
//   MessageController.markAsRead
// );
// export const MessageRoutes = router;
