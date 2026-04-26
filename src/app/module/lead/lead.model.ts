import { model, Schema } from "mongoose";
import { ILead, LeadStage } from "./lead.interface";





const LeadSchema = new Schema<ILead>({
    name: String,
    address: String,
    stage:{
        type:String,
        enum:Object.values(LeadStage),
        default:LeadStage.NEW
    },
    assigned_to: {type: Schema.Types.ObjectId, ref:"User"},
    organization: {type: Schema.Types.ObjectId, ref:"Organization"},
    roi_calculation:{
        bill: Number,
        system_size: Number,
        savings: Number
    }
},{timestamps: true})


export const Lead = model<ILead>("Lead",LeadSchema)