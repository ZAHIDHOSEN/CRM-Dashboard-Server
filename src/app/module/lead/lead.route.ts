import { Router } from "express";
import { LeadController } from "./lead.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";



const router = Router()


router.post("/",checkAuth(UserRole.ADMIN),LeadController.createLead)





export const LeadRoute = router