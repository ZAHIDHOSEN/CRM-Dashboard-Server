import { model, Schema, Types } from "mongoose";


const teamSchema = new Schema({
  name: String,
  leader: {
    type: Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],

  organization: {
    type: Types.ObjectId,
    ref: "Organization",
  },
}, { timestamps: true });

export const Team = model("Team", teamSchema);