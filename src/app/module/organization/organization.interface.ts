import { Types } from "mongoose";


export interface IOrganization {
  name: string;
  admin: Types.ObjectId; 
  users: Types.ObjectId[]; 
  branding?: {
    logo?: string;
    primaryColor?: string;
  };
 
}