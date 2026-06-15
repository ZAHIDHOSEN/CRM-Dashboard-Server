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
exports.PayrollServices = void 0;
const payroll_interface_1 = require("./payroll.interface");
const payroll_model_1 = require("./payroll.model");
const createPayroll = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.status) {
        payload.status = payroll_interface_1.PayrollStatus.PENDING;
    }
    const result = yield payroll_model_1.Payroll.create(payload);
    return result;
});
const getAllPayroll = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //   const filter: FilterQuery<IPayroll> = {};
    //   if (query.status) {
    //     filter.status = query.status as PayrollStatus;
    //   }
    //   if (query.user) {
    //     filter.user = query.user;
    //   }
    //   if (query.organization) {
    //     filter.organization = query.organization;
    //   }
    //   if (query.type) {
    //     filter.type = query.type;
    //   }
    const result = yield payroll_model_1.Payroll.find(query)
        .populate("user")
        .populate("organization")
        .populate("createdBy")
        .sort({ createdAt: -1 });
    return result;
});
const getSinglePayroll = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payroll_model_1.Payroll.findById(id)
        .populate("user")
        .populate("organization")
        .populate("createdBy");
    return result;
});
const deletePayroll = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payroll_model_1.Payroll.findByIdAndDelete(id);
    return result;
});
const updatePayroll = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payroll_model_1.Payroll.findByIdAndUpdate(id, payload, {
        new: true, runValidators: true
    });
    return result;
});
// advance
const updatePayrollStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payroll_model_1.Payroll.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    return result;
});
const getPayrollAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const total = yield payroll_model_1.Payroll.countDocuments();
    const pending = yield payroll_model_1.Payroll.countDocuments({
        status: payroll_interface_1.PayrollStatus.PENDING,
    });
    const paid = yield payroll_model_1.Payroll.countDocuments({
        status: payroll_interface_1.PayrollStatus.PAID,
    });
    const rejected = yield payroll_model_1.Payroll.countDocuments({
        status: payroll_interface_1.PayrollStatus.REJECTED,
    });
    const totalAmount = yield payroll_model_1.Payroll.aggregate([
        { $match: { status: payroll_interface_1.PayrollStatus.PAID } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    return {
        total,
        pending,
        paid,
        rejected,
        totalAmount: ((_a = totalAmount[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
    };
});
exports.PayrollServices = {
    createPayroll,
    getAllPayroll,
    getSinglePayroll,
    deletePayroll,
    updatePayroll,
    updatePayrollStatus,
    getPayrollAnalytics
};
