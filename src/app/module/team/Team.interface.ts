import { Types } from "mongoose";


export interface ITeam {
    name:string;
    leader: Types.ObjectId;
    members: Types.ObjectId[];
    organization:Types.ObjectId;

}