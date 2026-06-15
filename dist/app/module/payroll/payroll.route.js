"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRoute = void 0;
const express_1 = require("express");
const payroll_controller_1 = require("./payroll.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), payroll_controller_1.PayrollController.createPayroll);
router.get("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), payroll_controller_1.PayrollController.getAllPayroll);
// advance
router.get("/analytics", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), payroll_controller_1.PayrollController.getPayrollAnalytics);
router.patch("/:id/status", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), payroll_controller_1.PayrollController.updatePayroll);
// dynamic
router.get("/:id", (0, authMiddleware_1.checkAuth)(), payroll_controller_1.PayrollController.getSinglePayroll);
router.patch("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), payroll_controller_1.PayrollController.updatePayroll);
router.delete("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), payroll_controller_1.PayrollController.deletePayroll);
exports.PayrollRoute = router;
