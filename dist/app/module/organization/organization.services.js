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
exports.OrganizationServices = void 0;
const user_model_1 = require("../user/user.model");
const organization_model_1 = require("./organization.model");
const user_interface_1 = require("../user/user.interface");
const createOrganization = (payload, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isExist = yield organization_model_1.Organization.findOne({ name: payload.name });
    if (isExist) {
        throw new Error("organization already exists");
    }
    // const allUsers = await User.find().select("_id");
    // const userIds = allUsers.map((user)=>user._id)
    const organization = yield organization_model_1.Organization.create({
        name: payload.name,
        admin: adminId,
        users: [adminId],
        branding: {
            logo: (_a = payload.branding) === null || _a === void 0 ? void 0 : _a.logo,
            primaryColor: (_b = payload.branding) === null || _b === void 0 ? void 0 : _b.primaryColor
        }
    });
    yield user_model_1.User.findByIdAndUpdate(adminId, {
        organization: organization._id,
        role: user_interface_1.UserRole.ADMIN,
    });
    return organization;
});
const updateOrganization = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const organization = yield organization_model_1.Organization.findByIdAndUpdate(id, {
        name: payload.name,
        branding: {
            logo: (_a = payload.branding) === null || _a === void 0 ? void 0 : _a.logo,
            primaryColor: (_b = payload.branding) === null || _b === void 0 ? void 0 : _b.primaryColor
        }
    }, { new: true, runValidators: true });
    return organization;
});
const deleteOrganization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.findByIdAndDelete(id);
    if (!organization) {
        throw new Error("organization not found");
    }
    return organization;
});
const getAllOrganization = () => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.find();
    return organization;
});
const getSingleOrganization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.findById(id);
    if (!organization) {
        throw new Error("organization not found");
    }
    return organization;
});
const getMyOrganization = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).populate("organization");
    if (!user || !user.organization) {
        throw new Error("no organization found");
    }
    const organization = user.organization;
    return organization;
});
const addUserToOrganization = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.findById(id);
    if (!organization) {
        throw new Error("organization not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("user not found");
    }
    if (organization.users.includes(user._id)) {
        throw new Error("user already in organization");
    }
    organization.users.push(user._id);
    yield organization.save();
    // update user
    user.organization = organization._id;
    yield user.save();
    return organization;
});
const removeUserToOrganization = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield organization_model_1.Organization.findById(id);
    if (!organization) {
        throw new Error("organization not found");
    }
    organization.users = organization.users.filter((id) => id.toString() !== userId);
    yield organization.save();
    //   remove organization
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $unset: { organization: "" }
    });
    return organization;
});
const updateRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("user not found");
    }
    user.role = role;
    yield user.save();
    return user;
});
exports.OrganizationServices = {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getAllOrganization,
    getSingleOrganization,
    getMyOrganization,
    addUserToOrganization,
    removeUserToOrganization,
    updateRole
};
