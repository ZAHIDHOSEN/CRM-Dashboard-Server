// proposal.model.ts

import { Schema, model } from "mongoose";
import {
  IProposal,
  Status,
} from "./proposal.interface";



const savingsProjectionSchema = new Schema(
  {
    totalCost: {
      type: Number,
      required: true,
    },

    monthlySavings: {
      type: Number,
      required: true,
    },

    yearlySavings: {
      type: Number,
      required: true,
    },

    paybackPeriod: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);



const systemDesignSchema = new Schema(
  {
    systemSize: {
      type: Number,
      required: true,
    },

    panelCount: {
      type: Number,
      required: true,
    },

    inverterType: {
      type: String,
      required: true,
    },

    batteryIncluded: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);



const proposalSchema = new Schema<IProposal>(
  {
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    proposalNumber: {
      type: String,
      required: true,
      unique: true,
    },

    utilityBill: {
      type: Number,
      required: true,
    },

    roofType: {
      type: String,
    },

    savingsProjection: {
      type: savingsProjectionSchema,
      required: true,
    },

    systemDesign: {
      type: systemDesignSchema,
      required: true,
    },

    solarProofDesign: {
      type: String,
    },

    pdfFile: {
      type: String,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.DRAFT,
    },

    financingOption: {
      type: String,
    },

    taxCreditIncluded: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);



export const Proposal = model<IProposal>(
  "Proposal",
  proposalSchema
);