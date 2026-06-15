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
exports.LeadServices = void 0;
const lead_model_1 = require("./lead.model");
const createLead = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload;
    const isLeadExits = yield lead_model_1.Lead.findOne({ name });
    if (isLeadExits) {
        throw new Error("this name lead already exists");
    }
    const result = yield lead_model_1.Lead.create(payload);
    return result;
});
const updateLeads = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield lead_model_1.Lead.findById(id);
    if (!leads) {
        throw new Error("Leads not found");
    }
    const updatedLeads = yield lead_model_1.Lead.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return updatedLeads;
});
const deleteLeads = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lead_model_1.Lead.findByIdAndDelete(id);
    return result;
});
const getAllLeads = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lead_model_1.Lead.find();
    return result;
});
exports.LeadServices = {
    createLead,
    updateLeads,
    deleteLeads,
    getAllLeads
};
