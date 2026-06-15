"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoute = void 0;
const express_1 = require("express");
const organization_controller_1 = require("./organization.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.createOrganization);
router.patch("/:id", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.updateOrganization);
router.delete("/:id", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.deleteOrganization);
router.get("/", organization_controller_1.OrganizationController.getAllOrganization);
router.get("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN), organization_controller_1.OrganizationController.getSingleOrganization);
// advance 
router.get("/me", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.getMyOrganization);
router.post("/:id/users", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.addUserToOrganization);
router.delete("/:id/users/:userId", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.removeUserToOrganization);
router.patch("/:id/users/:userId", (0, authMiddleware_1.checkAuth)(), organization_controller_1.OrganizationController.updateRole);
exports.OrganizationRoute = router;
