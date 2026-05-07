import { Types } from "mongoose";

export enum Status {
  DRAFT = "draft",
  SENT = "sent",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface ISavingsProjection {
  totalCost: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackPeriod: number;
}

export interface ISystemDesign {
  systemSize: number;
  panelCount: number;
  inverterType: string;
  batteryIncluded: boolean;
}

export interface IProposal {
  lead: Types.ObjectId;

  client: Types.ObjectId;

  createdBy: Types.ObjectId;

  organization: Types.ObjectId;

  proposalNumber: string;

  utilityBill: number;

  roofType?: string;

  savingsProjection: ISavingsProjection;

  systemDesign: ISystemDesign;

  solarProofDesign?: string;

  pdfFile?: string;

  notes?: string;

  status: Status;

  financingOption?: string;

  taxCreditIncluded: boolean;
}