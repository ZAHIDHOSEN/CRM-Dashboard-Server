import { Schema, model, Types } from 'mongoose';
import { IUser, UserRole } from './user.interface';


const userSchema = new Schema<IUser>({
  name:{type: String, required:true,},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {type: String, required: true},
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.CLIENT 
  },

  organization: {type: Schema.Types.ObjectId, ref:"Organization" },
   team: { type: Schema.Types.ObjectId, ref: "Team" },
   downline: [{ type: Schema.Types.ObjectId, ref: "User" }],
   inviter: { type: Schema.Types.ObjectId, ref: "User" },
   certifications: [String],
   commission_balance: { type: Number, default: 0 },
   isApproved: { type: Boolean, default: false },
 
 
}, {
  timestamps: true, 
 
});

export const User = model<IUser>('User', userSchema);



