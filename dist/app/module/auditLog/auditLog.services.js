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
exports.AuditLogServices = void 0;
const auditLog_model_1 = require("./auditLog.model");
const createAuditLog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auditLog_model_1.AuditLog.create(payload);
    return result;
});
const getAllAuditLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auditLog_model_1.AuditLog.find()
        .populate("user", "name email role")
        .populate("organization", "name")
        .sort({ createdAt: -1 });
    return result;
});
const getSingleAuditLog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auditLog_model_1.AuditLog.findById(id)
        .populate("user", "name email role")
        .populate("organization", "name");
    return result;
});
exports.AuditLogServices = {
    createAuditLog,
    getAllAuditLogs,
    getSingleAuditLog
};
