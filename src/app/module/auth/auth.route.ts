import { Router } from "express";
import { AuthController } from "./auth.controller";




const router = Router()

router.post("/",AuthController.login)
router.post("/logout",AuthController.logOut)
router.post("/reset-password",AuthController.resetPassword)




export const AuthRouter = router