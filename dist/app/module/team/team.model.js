"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: String,
    leader: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    members: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    organization: {
        type: mongoose_1.Types.ObjectId,
        ref: "Organization",
    },
}, { timestamps: true });
exports.Team = (0, mongoose_1.model)("Team", teamSchema);
