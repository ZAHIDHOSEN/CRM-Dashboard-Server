import { Types } from "mongoose";

export enum PayrollStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  PAID = "paid",
  REJECTED = "rejected",
}

export enum PayrollType {
  COMMISSION = "commission",
  BONUS = "bonus",
  SALARY = "salary",
  REFERRAL = "referral",
}

export interface IPayroll {
  user: Types.ObjectId;
  organization: Types.ObjectId;

  amount: number;

  type: PayrollType;

  status: PayrollStatus;

  payDate?: Date;

  description?: string;

  createdBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}