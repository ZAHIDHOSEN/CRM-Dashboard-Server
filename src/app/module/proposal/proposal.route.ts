import { Router } from "express";
import { ProposalController } from "./proposal.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";


const router = Router()


router.post("/",checkAuth(UserRole.ADMIN,UserRole.LEADER),ProposalController.createProposal)
router.get("/",checkAuth(UserRole.ADMIN,UserRole.LEADER),ProposalController.getAllProposal)


export const ProposalRoute = router