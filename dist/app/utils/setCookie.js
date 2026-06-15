"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const isProduction = process.env.NODE_ENV === "production";
const setAuthCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: isProduction, //process.env.NODE_ENV === "production",
            sameSite: (isProduction ? "none" : "lax"),
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: (isProduction ? "none" : "lax"),
        });
    }
};
exports.setAuthCookie = setAuthCookie;
