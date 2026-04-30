import { Types } from "mongoose";


export enum UserRole {
  ADMIN = 'ADMIN',
  SETTER = 'SETTER',
  CLOSER = 'CLOSER',
  INSTALLER = 'INSTALLER',
  CLIENT = 'CLIENT',
  LEADER = 'LEADER' 
}


export interface IUser {
   name: string,
   email: string;
   password?: string;
   role: UserRole;
   organization?: Types.ObjectId;
   team?: Types.ObjectId;
   downline?: Types.ObjectId[];
   inviter?: Types.ObjectId;
   certifications?: string[];
   commission_balance?: number;
   isApproved?: boolean;


 



}