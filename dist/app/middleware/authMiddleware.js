"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        try {
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
            if (!token) {
                throw new Error("Unauthorized: No token");
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            req.user = decoded;
            //  Role check
            if (roles.length && !roles.includes(decoded.role)) {
                throw new Error("Forbidden: You are not allowed");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.checkAuth = checkAuth;
