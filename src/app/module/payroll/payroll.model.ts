import { Schema, model } from "mongoose";
import { IPayroll, PayrollStatus, PayrollType } from "./payroll.interface";

const payrollSchema = new Schema<IPayroll>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: Object.values(PayrollType),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(PayrollStatus),
      default: PayrollStatus.PENDING,
    },

    payDate: {
      type: Date,
    },

    description: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payroll = model<IPayroll>("Payroll", payrollSchema);