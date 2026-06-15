"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalRoute = void 0;
const express_1 = require("express");
const proposal_controller_1 = require("./proposal.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), proposal_controller_1.ProposalController.createProposal);
router.get("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLIENT, user_interface_1.UserRole.CLOSER), proposal_controller_1.ProposalController.getAllProposal);
// advance
router.patch("/:id/status", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), proposal_controller_1.ProposalController.updateProposalStatus);
router.get("/analytics", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), proposal_controller_1.ProposalController.getProposalAnalytics);
// dynamic route
router.get("/:id", (0, authMiddleware_1.checkAuth)(), proposal_controller_1.ProposalController.getSingleProposal);
router.patch("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), proposal_controller_1.ProposalController.updateProposal);
router.delete("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.CLOSER), proposal_controller_1.ProposalController.deleteProposal);
exports.ProposalRoute = router;
