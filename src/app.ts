import express,{ Request, Response } from "express"
import cookieParser from "cookie-parser"
import { UserRoute } from "./app/module/user/user.route"
import { LeadRoute } from "./app/module/lead/lead.route"
import { AuthRouter } from "./app/module/auth/auth.route"

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user",UserRoute)
app.use("/api/v1/lead",LeadRoute)
app.use("/api/v1/auth",AuthRouter)


app.get("/",(req:Request,res:Response)=>{

    res.status(200).json({
        message:"wellCome to crm dashboard"
    })
})


export default app 
