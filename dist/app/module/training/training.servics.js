"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingServices = void 0;
const training_model_1 = require("./training.model");
const createTraining = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_model_1.TrainingModule.create(payload);
    return result;
});
const getAllTraining = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_model_1.TrainingModule.find(query)
        .populate("organization")
        .populate("createdBy");
    return result;
});
const getSingleTraining = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_model_1.TrainingModule.findById(id)
        .populate("organization")
        .populate("createdBy");
    return result;
});
const deleteTraining = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_model_1.TrainingModule.findByIdAndDelete(id);
    return result;
});
const updateTraining = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const training = yield training_model_1.TrainingModule.findById(id);
    if (!training) {
        throw new Error("training not found");
    }
    const result = yield training_model_1.TrainingModule.findByIdAndUpdate(id, payload, {
        new: true, runValidators: true
    });
    return result;
});
// advance
const getTrainingByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_model_1.TrainingModule.find({
        role,
        isPublished: true
    });
    return result;
});
const getPublishedTrainings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_model_1.TrainingModule.find({
        isPublished: true,
    });
    return result;
});
const togglePublishTraining = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const training = yield training_model_1.TrainingModule.findById(id);
    if (!training) {
        throw new Error("Training not found");
    }
    training.isPublished = !training.isPublished;
    yield training.save();
    return training;
});
const submitQuiz = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const training = yield training_model_1.TrainingModule.findById(id);
    if (!training) {
        throw new Error("Training not found");
    }
    if (!((_a = training.quizQuestions) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new Error("Quiz not available");
    }
    let score = 0;
    training.quizQuestions.forEach((quiz, index) => {
        if (quiz.correctAnswer === payload.answers[index]) {
            score++;
        }
    });
    const totalQuestions = training.quizQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    return {
        totalQuestions,
        correctAnswers: score,
        percentage,
    };
});
exports.TrainingServices = {
    createTraining,
    getAllTraining,
    getSingleTraining,
    deleteTraining,
    updateTraining,
    getTrainingByRole,
    getPublishedTrainings,
    togglePublishTraining,
    submitQuiz
};
