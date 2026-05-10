// training.model.ts

import { Schema, model } from "mongoose";

import {
  IQuizQuestion,
  ITrainingModule,
} from "./training.interface";

import { UserRole } from "../user/user.interface";





const quizQuestionSchema = new Schema<IQuizQuestion>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        type: String,
        required: true,
      },
    ],

    correctAnswer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);





const trainingModuleSchema =
  new Schema<ITrainingModule>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
      },

      role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
      },

      videoUrl: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
      },

      duration: {
        type: Number,
      },

      quizQuestions: {
        type: [quizQuestionSchema],
        default: [],
      },

      certification: {
        type: String,
      },

      xpReward: {
        type: Number,
        default: 0,
      },

      isPublished: {
        type: Boolean,
        default: false,
      },

      organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );





export const TrainingModule =
  model<ITrainingModule>(
    "TrainingModule",
    trainingModuleSchema
  );