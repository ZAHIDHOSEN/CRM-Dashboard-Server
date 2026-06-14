import { Router } from "express";
import { LeadController } from "./lead.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";



const router = Router()


router.post("/",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.SETTER,UserRole.CLOSER),LeadController.createLead)
router.get("/",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.SETTER,UserRole.CLOSER),LeadController.getAllLeads)
router.patch("/:id",checkAuth(),LeadController.updateLeads)
router.delete("/:id",checkAuth(),LeadController.deleteLeads)





export const LeadRoute = router