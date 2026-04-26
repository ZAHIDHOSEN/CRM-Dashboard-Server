import { Types } from "mongoose";


export enum LeadStage {
    NEW = "NEW",
    APPOINTMENT = "APPOINTMENT",
    PROPOSAL = "PROPOSAL",
    CLOSED = "CLOSED",
    INSTALLED = "INSTALLED "
}


export interface ILead {
    name: string;
    address: string;
    stage: LeadStage;
    assigned_to: Types.ObjectId;
    organization: Types.ObjectId;
    roi_calculation?:{
        bill: number;
        system_size:number;
        savings: number;
    } 

}