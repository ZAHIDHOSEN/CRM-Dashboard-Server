"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
router.post("/", user_controller_1.UserController.createUser);
router.get("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), user_controller_1.UserController.getAllUsers);
router.patch("/:id", (0, authMiddleware_1.checkAuth)(), user_controller_1.UserController.updateUser),
    router.delete("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER), user_controller_1.UserController.deleteUser);
exports.UserRoute = router;
