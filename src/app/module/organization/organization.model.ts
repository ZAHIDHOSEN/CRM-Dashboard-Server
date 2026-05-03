import { Schema, model } from "mongoose";



const organizationSchema = new Schema(
  {
    name: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    branding: {
      logo: String,
      primaryColor: String,
    },
  },
  { timestamps: true }
 );

  export const Organization = model("Organization", organizationSchema);