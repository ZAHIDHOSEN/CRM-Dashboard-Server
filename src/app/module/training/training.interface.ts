import { Types } from "mongoose";
import { UserRole } from "../user/user.interface";



export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}



export interface ITrainingModule {
  title: string;
  description?: string;
  role: UserRole;
  videoUrl: string;
  thumbnail?: string;
  duration?: number;
  quizQuestions?: IQuizQuestion[];
  certification?: string;
  xpReward?: number;
  isPublished: boolean;
  organization: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}