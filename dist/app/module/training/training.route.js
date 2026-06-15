"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingRoute = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const user_interface_1 = require("../user/user.interface");
const training_controller_1 = require("./training.controller");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.SETTER, user_interface_1.UserRole.CLOSER, user_interface_1.UserRole.INSTALLER), training_controller_1.TrainingController.createTraining);
router.get("/", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.SETTER, user_interface_1.UserRole.CLOSER, user_interface_1.UserRole.INSTALLER), training_controller_1.TrainingController.getAllTraining);
router.get("/my-training", (0, authMiddleware_1.checkAuth)(), training_controller_1.TrainingController.getTrainingByRole);
router.post("/submit-quiz/:id", (0, authMiddleware_1.checkAuth)(), training_controller_1.TrainingController.submitQuiz);
router.get("/published", (0, authMiddleware_1.checkAuth)(), training_controller_1.TrainingController.getPublishedTrainings);
router.patch("/publish/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.SETTER, user_interface_1.UserRole.CLOSER, user_interface_1.UserRole.INSTALLER), training_controller_1.TrainingController.togglePublishTraining);
// dynamic route
router.get("/:id", (0, authMiddleware_1.checkAuth)(), training_controller_1.TrainingController.getSingleTraining);
router.patch("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.SETTER, user_interface_1.UserRole.CLOSER, user_interface_1.UserRole.INSTALLER), training_controller_1.TrainingController.updateTraining);
router.delete("/:id", (0, authMiddleware_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.LEADER, user_interface_1.UserRole.SETTER, user_interface_1.UserRole.CLOSER, user_interface_1.UserRole.INSTALLER), training_controller_1.TrainingController.deleteTraining);
exports.TrainingRoute = router;
