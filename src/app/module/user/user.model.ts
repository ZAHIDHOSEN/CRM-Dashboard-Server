import { Schema, model, Types } from 'mongoose';
import { IUser, UserRole } from './user.interface';


const userSchema = new Schema<IUser>({
  orgId: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.CLIENT 
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatarUrl: { type: String },
    phoneNumber: { type: String, required: true }
  },
  onboarding: {
    isCompleted: { type: Boolean, default: false },
    currentStep: { type: Number, default: 0 },
    checklistItems: [{ type: String }]
  },
  gamification: {
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{ type: String }],
    streakDays: { type: Number, default: 0 }
  },
  downline: {
    uplineId: { type: String, default: null }, 
    referralCode: { type: String, unique: true, required: true },
    level: { type: Number, default: 0 },
    childrenIds: [{ type: String }] 
  }
}, {
  timestamps: true, 
 
});

export const User = model<IUser>('User', userSchema);



