import express,{ Request, Response } from "express"
import cookieParser from "cookie-parser"
import { UserRoute } from "./app/module/user/user.route"
import { LeadRoute } from "./app/module/lead/lead.route"
import { AuthRouter } from "./app/module/auth/auth.route"
import { OrganizationRoute } from "./app/module/organization/organization.route"
import { TeamRoute } from "./app/module/team/team.route"
import { ProposalRoute } from "./app/module/proposal/proposal.route"
import { PayrollRoute } from "./app/module/payroll/payroll.route"
import { TrainingRoute } from "./app/module/training/training.route"


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user",UserRoute)
app.use("/api/v1/lead",LeadRoute)
app.use("/api/v1/auth",AuthRouter)
app.use("/api/v1/organization",OrganizationRoute)
app.use("/api/v1/team",TeamRoute)
app.use("/api/v1/proposal",ProposalRoute)
app.use("/api/v1/payroll",PayrollRoute)
app.use("/api/v1/training",TrainingRoute)


app.get("/",(req:Request,res:Response)=>{

    res.status(200).json({
        message:"wellCome to crm dashboard"
    })
})


export default app 
