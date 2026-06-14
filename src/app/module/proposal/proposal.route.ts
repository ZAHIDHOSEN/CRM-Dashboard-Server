import { Router } from "express";
import { ProposalController } from "./proposal.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";


const router = Router()


router.post("/",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLOSER),ProposalController.createProposal)
router.get("/",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLIENT,UserRole.CLOSER),ProposalController.getAllProposal)
// advance
router.patch("/:id/status",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLOSER),ProposalController.updateProposalStatus)
router.get("/analytics",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLOSER),ProposalController.getProposalAnalytics)
// dynamic route
router.get("/:id",checkAuth(),ProposalController.getSingleProposal)
router.patch("/:id",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLOSER),ProposalController.updateProposal)
router.delete("/:id",checkAuth(UserRole.ADMIN,UserRole.LEADER,UserRole.CLOSER),ProposalController.deleteProposal)



export const ProposalRoute = router