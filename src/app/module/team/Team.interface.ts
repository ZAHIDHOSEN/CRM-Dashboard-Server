import { Types } from "mongoose";


export interface ITeam {
    name:string;
    leader: Types.ObjectId;
    member: Types.ObjectId[];
    organization:Types.ObjectId;

}