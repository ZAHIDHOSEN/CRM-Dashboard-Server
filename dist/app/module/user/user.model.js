"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.UserRole),
        default: user_interface_1.UserRole.CLIENT
    },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organization" },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: "Team" },
    downline: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    inviter: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    certifications: [String],
    commission_balance: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
