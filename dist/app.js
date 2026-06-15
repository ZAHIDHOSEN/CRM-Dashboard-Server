"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = require("./app/module/user/user.route");
const lead_route_1 = require("./app/module/lead/lead.route");
const auth_route_1 = require("./app/module/auth/auth.route");
const organization_route_1 = require("./app/module/organization/organization.route");
const team_route_1 = require("./app/module/team/team.route");
const proposal_route_1 = require("./app/module/proposal/proposal.route");
const payroll_route_1 = require("./app/module/payroll/payroll.route");
const training_route_1 = require("./app/module/training/training.route");
const cors_1 = __importDefault(require("cors"));
const auditLog_route_1 = require("./app/module/auditLog/auditLog.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "https://crm-dashboard-client.vercel.app",
        "http://localhost:5173",
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/user", user_route_1.UserRoute);
app.use("/api/v1/lead", lead_route_1.LeadRoute);
app.use("/api/v1/auth", auth_route_1.AuthRouter);
app.use("/api/v1/organization", organization_route_1.OrganizationRoute);
app.use("/api/v1/team", team_route_1.TeamRoute);
app.use("/api/v1/proposal", proposal_route_1.ProposalRoute);
app.use("/api/v1/payroll", payroll_route_1.PayrollRoute);
app.use("/api/v1/training", training_route_1.TrainingRoute);
app.use("/api/v1/audit-log", auditLog_route_1.AuditLogRoute);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "wellCome to crm dashboard"
    });
});
exports.default = app;
