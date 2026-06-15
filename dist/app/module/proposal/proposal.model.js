"use strict";
// proposal.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const mongoose_1 = require("mongoose");
const proposal_interface_1 = require("./proposal.interface");
const savingsProjectionSchema = new mongoose_1.Schema({
    totalCost: {
        type: Number,
        required: true,
    },
    monthlySavings: {
        type: Number,
        required: true,
    },
    yearlySavings: {
        type: Number,
        required: true,
    },
    paybackPeriod: {
        type: Number,
        required: true,
    },
}, {
    _id: false,
});
const systemDesignSchema = new mongoose_1.Schema({
    systemSize: {
        type: Number,
        required: true,
    },
    panelCount: {
        type: Number,
        required: true,
    },
    inverterType: {
        type: String,
        required: true,
    },
    batteryIncluded: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
const proposalSchema = new mongoose_1.Schema({
    lead: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lead",
        required: true,
    },
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    proposalNumber: {
        type: String,
        required: true,
        unique: true,
    },
    utilityBill: {
        type: Number,
        required: true,
    },
    roofType: {
        type: String,
    },
    savingsProjection: {
        type: savingsProjectionSchema,
        required: true,
    },
    systemDesign: {
        type: systemDesignSchema,
        required: true,
    },
    solarProofDesign: {
        type: String,
    },
    pdfFile: {
        type: String,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(proposal_interface_1.Status),
        default: proposal_interface_1.Status.DRAFT,
    },
    financingOption: {
        type: String,
    },
    taxCreditIncluded: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Proposal = (0, mongoose_1.model)("Proposal", proposalSchema);
