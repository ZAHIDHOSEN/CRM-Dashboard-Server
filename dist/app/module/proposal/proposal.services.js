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
exports.ProposalServices = void 0;
const proposal_interface_1 = require("./proposal.interface");
const proposal_model_1 = require("./proposal.model");
const createProposal = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const proposalNumber = `PROP-${Date.now()}`;
    payload.proposalNumber = proposalNumber;
    const result = yield proposal_model_1.Proposal.create(payload);
    return result;
});
const getAllProposal = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proposal_model_1.Proposal.find(query)
        .populate("lead")
        .populate("client")
        .populate("createdBy")
        .populate("organization");
    return result;
});
const getSingleProposal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proposal_model_1.Proposal.findById(id)
        .populate("lead")
        .populate("client")
        .populate("createdBy")
        .populate("organization");
    return result;
});
const updateProposal = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proposal_model_1.Proposal.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("lead")
        .populate("client")
        .populate("createdBy")
        .populate("organization");
    return result;
});
const deleteProposal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proposal_model_1.Proposal.findByIdAndDelete(id);
    return result;
});
// advance
const updateProposalStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield proposal_model_1.Proposal.findByIdAndUpdate(id, { status }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const getProposalAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalProposal = yield proposal_model_1.Proposal.countDocuments();
    const draftProposal = yield proposal_model_1.Proposal.countDocuments({
        status: proposal_interface_1.Status.DRAFT,
    });
    const sentProposal = yield proposal_model_1.Proposal.countDocuments({
        status: proposal_interface_1.Status.SENT,
    });
    const acceptedProposal = yield proposal_model_1.Proposal.countDocuments({
        status: proposal_interface_1.Status.ACCEPTED,
    });
    const rejectedProposal = yield proposal_model_1.Proposal.countDocuments({
        status: proposal_interface_1.Status.REJECTED,
    });
    return {
        totalProposal,
        draftProposal,
        sentProposal,
        acceptedProposal,
        rejectedProposal,
    };
});
exports.ProposalServices = {
    createProposal,
    getAllProposal,
    getSingleProposal,
    updateProposal,
    deleteProposal,
    updateProposalStatus,
    getProposalAnalytics
};
