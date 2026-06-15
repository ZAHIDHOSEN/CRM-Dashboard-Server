"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoute = void 0;
const express_1 = require("express");
const team_controller_1 = require("./team.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), team_controller_1.TeamController.createTeam);
router.patch("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), team_controller_1.TeamController.updateTeam);
router.delete("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), team_controller_1.TeamController.deleteTeam);
router.get("/allTeam", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), team_controller_1.TeamController.getAllTeam);
// advance
router.patch("/:teamId/add-member/:userId", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), team_controller_1.TeamController.addMemberToTeam);
router.patch("/:teamId/remove-member/:userId", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), team_controller_1.TeamController.removeMemberFromTeam);
exports.TeamRoute = router;
