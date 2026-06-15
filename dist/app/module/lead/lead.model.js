"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = require("mongoose");
const lead_interface_1 = require("./lead.interface");
const LeadSchema = new mongoose_1.Schema({
    name: String,
    address: String,
    stage: {
        type: String,
        enum: Object.values(lead_interface_1.LeadStage),
        default: lead_interface_1.LeadStage.NEW
    },
    assigned_to: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organization" },
    roi_calculation: {
        bill: Number,
        system_size: Number,
        savings: Number
    }
}, { timestamps: true });
exports.Lead = (0, mongoose_1.model)("Lead", LeadSchema);
