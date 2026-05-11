import { Router } from "express";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";
import { TrainingController } from "./training.controller";




const router = Router()

router.post("/",checkAuth(UserRole.ADMIN),TrainingController.createTraining)
router.get("/",checkAuth(UserRole.ADMIN),TrainingController.getAllTraining)
router.get("/my-training",checkAuth(),TrainingController.getTrainingByRole)
router.post("/submit-quiz/:id",checkAuth(),TrainingController.submitQuiz)
router.get("/published",checkAuth(),TrainingController.getPublishedTrainings)
router.patch("/publish/:id",checkAuth(UserRole.ADMIN),TrainingController.togglePublishTraining)

// dynamic route
router.get("/:id",checkAuth(),TrainingController.getSingleTraining)
router.patch("/:id",checkAuth(UserRole.ADMIN),TrainingController.updateTraining)
router.delete("/:id",checkAuth(UserRole.ADMIN),TrainingController.deleteTraining)




export const TrainingRoute = router