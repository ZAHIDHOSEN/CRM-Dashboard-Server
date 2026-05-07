import { Router } from "express";
import { TeamController } from "./team.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";




const router = Router()

router.post("/",checkAuth(UserRole.ADMIN),TeamController.createTeam)
router.patch("/:id",checkAuth(UserRole.ADMIN),TeamController.updateTeam)
router.delete("/:id",checkAuth(UserRole.ADMIN),TeamController.deleteTeam)
router.get("/allTeam",checkAuth(UserRole.ADMIN),TeamController.getAllTeam)



export const TeamRoute = router 