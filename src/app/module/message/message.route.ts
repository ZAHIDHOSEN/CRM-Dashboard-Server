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