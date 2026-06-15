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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const isUserExits = yield user_model_1.User.findOne({ email });
    if (isUserExits) {
        throw new Error("user already exists");
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, userData), { password: hashPassword }));
    const result = user.toObject();
    delete result.password;
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new Error("User didnot exists in db");
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return updatedUser;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndDelete(id);
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find();
    const usersNumber = yield user_model_1.User.countDocuments();
    return {
        allUsers,
        usersNumber
    };
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    return user;
});
exports.UserServices = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getMe
};
