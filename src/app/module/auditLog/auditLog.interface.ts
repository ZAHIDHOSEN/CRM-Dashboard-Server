import { Types } from "mongoose";

export interface IAuditLog {
  user: Types.ObjectId;
  action: string;
  module: string;
  description?: string;
  organization: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}