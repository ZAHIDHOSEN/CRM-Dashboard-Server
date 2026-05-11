import { Types } from "mongoose";

export interface IMessage {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  organization: Types.ObjectId;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}