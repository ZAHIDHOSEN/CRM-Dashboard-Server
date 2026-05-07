import { Router } from "express";
import { TeamController } from "./team.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";




const router = Router()

router.post("/",checkAuth(UserRole.ADMIN),TeamController.createTeam)
router.patch("/:id",checkAuth(UserRole.ADMIN),TeamController.updateTeam)
router.delete("/:id",checkAuth(UserRole.ADMIN),TeamController.deleteTeam)
router.get("/allTeam",checkAuth(UserRole.ADMIN),TeamController.getAllTeam)
// advance
router.patch("/:teamId/add-member/:userId",checkAuth(UserRole.ADMIN, UserRole.LEADER),TeamController.addMemberToTeam)
router.patch("/:teamId/remove-member/:userId",checkAuth(UserRole.ADMIN, UserRole.LEADER),TeamController.removeMemberFromTeam)



export const TeamRoute = router 