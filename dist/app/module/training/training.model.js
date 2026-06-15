"use strict";
// training.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingModule = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../user/user.interface");
const quizQuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    correctAnswer: {
        type: String,
        required: true,
    },
}, {
    _id: false,
});
const trainingModuleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.UserRole),
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    duration: {
        type: Number,
    },
    quizQuestions: {
        type: [quizQuestionSchema],
        default: [],
    },
    certification: {
        type: String,
    },
    xpReward: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.TrainingModule = (0, mongoose_1.model)("TrainingModule", trainingModuleSchema);
