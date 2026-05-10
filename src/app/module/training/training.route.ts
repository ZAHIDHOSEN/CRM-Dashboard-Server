import { Router } from "express";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";
import { TrainingController } from "./training.controller";




const router = Router()

router.post("/",checkAuth(UserRole.ADMIN),TrainingController.createTraining)
router.get("/",checkAuth(UserRole.ADMIN),TrainingController.getAllTraining)




export const TrainingRoute = router