import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/authMiddleware";




const router = Router()

router.post("/login",AuthController.login)
router.post("/logout",AuthController.logOut)
router.post("/reset-password",AuthController.resetPassword)
router.get("/me",checkAuth(),AuthController.getMe)



export const AuthRouter = router