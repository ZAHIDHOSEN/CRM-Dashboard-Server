import { Request, Response } from "express";
import { LeadServices } from "./lead.services";


const createLead = async(req:Request,res:Response)=>{
    try {
        const leadData = req.body
        const assigned_to = req.user._id
        const payload = {...leadData,assigned_to}
        const result = await LeadServices.createLead(payload)

      res.status(201).json({
            success: true,
            message:"Lead created successfully",
            data:result
        })
    } catch (error:any) {
        console.log(error)
      res.status(400).json({
      success: false,
      message:error.message
    });
    }
}











export const LeadController = {
     createLead
}