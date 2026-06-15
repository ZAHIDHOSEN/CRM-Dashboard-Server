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
exports.AuthController = void 0;
const auth_services_1 = require("./auth.services");
const setCookie_1 = require("../../utils/setCookie");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const isProduction = process.env.NODE_ENV === "production";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield auth_services_1.AuthServices.login(email, password);
        (0, setCookie_1.setAuthCookie)(res, result);
        res.status(201).json({
            success: true,
            message: "login successfully",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Login failed."
        });
    }
});
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: (isProduction ? "none" : "lax"),
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: (isProduction ? "none" : "lax"),
        });
        res.status(401).json({
            success: true,
            message: "logout successfully completed"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Logout failed."
        });
    }
});
const resetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const decodedToken = req.user;
    yield auth_services_1.AuthServices.resetPassword(payload, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: "password reset successfully",
        data: null
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!id) {
        throw new Error("Unauthorized:user data missing");
    }
    const result = yield auth_services_1.AuthServices.getMe(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User get successfully",
        data: result
    });
}));
exports.AuthController = {
    login,
    logOut,
    resetPassword,
    getMe
};
