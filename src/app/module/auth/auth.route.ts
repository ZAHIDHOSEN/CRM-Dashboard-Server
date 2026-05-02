import { Router } from "express";
import { AuthController } from "./auth.controller";




const router = Router()

router.post("/",AuthController.login)
router.post("/logout",AuthController.logOut)





export const AuthRouter = router