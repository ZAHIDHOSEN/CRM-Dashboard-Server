"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payroll = void 0;
const mongoose_1 = require("mongoose");
const payroll_interface_1 = require("./payroll.interface");
const payrollSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    type: {
        type: String,
        enum: Object.values(payroll_interface_1.PayrollType),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(payroll_interface_1.PayrollStatus),
        default: payroll_interface_1.PayrollStatus.PENDING,
    },
    payDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.Payroll = (0, mongoose_1.model)("Payroll", payrollSchema);
