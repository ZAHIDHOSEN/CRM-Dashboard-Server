import { Router } from "express";
import { AuthController } from "./auth.controller";




const router = Router()

router.post("/",AuthController.login)






export const AuthRouter = router