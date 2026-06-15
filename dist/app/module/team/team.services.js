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
exports.TeamServices = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const team_model_1 = require("./team.model");
const createTeam = (payload, orgId) => __awaiter(void 0, void 0, void 0, function* () {
    const isTeamExits = yield team_model_1.Team.findOne({ name: payload.name });
    if (isTeamExits) {
        throw new Error("Team already exists");
    }
    const leader = yield user_model_1.User.findById(payload.leader);
    if (!leader) {
        throw new Error("leader not found");
    }
    // const organizations = await Organization.findById(orgId).populate("name")
    const newTeam = yield team_model_1.Team.create({
        name: payload.name,
        leader: payload.leader,
        // organization:orgId,
        organization: payload.organization,
        members: payload.members || []
    });
    return newTeam;
    // return await newTeam.populate("leader","name email")
});
const updateTeam = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const team = yield team_model_1.Team.findById(id);
    if (!team) {
        throw new Error("Team didnot exists in db");
    }
    if (payload.leader) {
        const leader = yield user_model_1.User.findById(payload.leader);
        if (!leader) {
            throw new Error("leader not found");
        }
    }
    if ((_a = payload.members) === null || _a === void 0 ? void 0 : _a.length) {
        const members = yield user_model_1.User.find({
            _id: {
                $in: payload.members,
            }
        });
        if (members.length !== payload.members.length) {
            throw new Error("some members not found");
        }
    }
    const updatedTeam = yield team_model_1.Team.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).populate("leader").populate("members");
    return updatedTeam;
});
const deleteTeam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield team_model_1.Team.findByIdAndDelete(id);
    return team;
});
const getAllTeam = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTeam = yield team_model_1.Team.find().populate("leader").populate("members");
    const teamNumber = yield team_model_1.Team.countDocuments();
    return {
        allTeam,
        teamNumber
    };
});
const getSingleTeam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield team_model_1.Team.findById(id).populate("leader").populate("members");
    if (!team) {
        throw new Error("team not found");
    }
    return team;
});
// add members
const addMemberToTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield team_model_1.Team.findById(teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    // prevent duplicate
    const alreadyMember = team.members.includes(new mongoose_1.Types.ObjectId(userId));
    if (alreadyMember) {
        throw new Error("User already exists in team");
    }
    team.members.push(new mongoose_1.Types.ObjectId(userId));
    yield team.save();
    return team;
});
// remove member to team
const removeMemberFromTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield team_model_1.Team.findById(teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    team.members = team.members.filter((memberId) => memberId.toString() !== userId);
    yield team.save();
    return team;
});
exports.TeamServices = {
    createTeam,
    updateTeam,
    deleteTeam,
    getAllTeam,
    getSingleTeam,
    addMemberToTeam,
    removeMemberFromTeam
};
