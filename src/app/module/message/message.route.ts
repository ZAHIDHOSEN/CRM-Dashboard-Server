import { Router } from "express";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";
import { MessageController } from "./message.controller";





const router = Router()

router.post("/send-message",checkAuth(UserRole.ADMIN,UserRole.LEADER,
    UserRole.CLOSER),MessageController.sendMessage)

router.get("/:organizationId/:partnerId",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLOSER),
MessageController.getChatHistory
)



export const MessageRoute = router