"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    admin: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    branding: {
        logo: String,
        primaryColor: String,
    },
}, { timestamps: true });
exports.Organization = (0, mongoose_1.model)("Organization", organizationSchema);
