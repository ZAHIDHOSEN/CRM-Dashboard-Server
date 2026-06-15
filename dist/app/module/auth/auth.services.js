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
exports.AuthServices = void 0;
const user_model_1 = require("../user/user.model");
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("user not found. Please register");
    }
    const dbPassword = user.password;
    const comparePassword = yield bcrypt_1.default.compare(password, dbPassword);
    if (!comparePassword) {
        throw new Error("password does not match");
    }
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        // organization:user.organization
    };
    const userWithOutPassword = user.toObject();
    delete userWithOutPassword.password;
    const accessToken = (0, jwt_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.createToken)(jwtPayload, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES);
    return {
        userWithOutPassword,
        accessToken,
        refreshToken
    };
});
const resetPassword = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.id != decodedToken.userId) {
        throw new Error("you can't reset password");
    }
    const isUserExit = yield user_model_1.User.findById(decodedToken.userId);
    if (!isUserExit) {
        throw new Error("user does not exists");
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(10));
    isUserExit.password = hashPassword;
    yield isUserExit.save();
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    return user;
});
exports.AuthServices = {
    login,
    resetPassword,
    getMe
};
