import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "./user.interface";



const router = Router()


router.post("/",UserController.createUser)
router.get("/",checkAuth(UserRole.ADMIN,UserRole.LEADER),UserController.getAllUsers)
router.patch("/:id",checkAuth(),UserController.updateUser),
router.delete("/:id",checkAuth(UserRole.ADMIN,UserRole.INSTALLER),UserController.deleteUser)






export const UserRoute = router