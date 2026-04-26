import { Request, Response } from "express";
import { LeadServices } from "./lead.services";


const createLead = async(req:Request,res:Response)=>{
    try {
        const leadData = req.body
        const result = await LeadServices.createLead(leadData)

      res.status(201).json({
            success: true,
            message:"Lead created successfully",
            data:result
        })
    } catch (error) {
        console.log(error)
      res.status(400).json({
      success: false,
      message: "Unable to complete Lead. Please check your input or try again later."
    });
    }
}











export const LeadController = {
     createLead
}