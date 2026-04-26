import { Router } from "express";
import { LeadController } from "./lead.controller";



const router = Router()


router.post("/",LeadController.createLead)





export const LeadRoute = router