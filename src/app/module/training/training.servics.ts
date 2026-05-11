import { PayrollStatus } from "../payroll/payroll.interface"
import { UserRole } from "../user/user.interface"
import { ITrainingModule } from "./training.interface"
import { TrainingModule } from "./training.model"




const createTraining = async(payload:Partial<ITrainingModule>)=>{
   
    const result = await TrainingModule.create(payload)

    return result
}



const getAllTraining = async(query:Record<string,unknown>)=>{
    const result = await TrainingModule.find(query)
    .populate("organization")
    .populate("createdBy")

}


const getSingleTraining = async(id:string)=>{
    
    const result = await TrainingModule.findById(id)
    .populate("organization")
    .populate("createdBy")
    return result
}


const deleteTraining = async(id:string)=>{
    const result = await TrainingModule.findByIdAndDelete(id)
    return result 
}


const updateTraining = async(id:string,payload:Partial<ITrainingModule>)=>{
   
    const training = await TrainingModule.findById(id)
    if(!training){
        throw new Error("training not found")
    }

    const result = await TrainingModule.findByIdAndUpdate(id,payload,{
        new:true, runValidators:true
    })

    return result
}

// advance

const getTrainingByRole = async(role:UserRole)=>{
    const result = await TrainingModule.find({
        role,
        isPublished:true
    })

    return result 
}


const getPublishedTrainings = async () => {

  const result = await TrainingModule.find({
    isPublished: true,
  });

  return result;
};


const togglePublishTraining = async (id: string) => {

  const training = await TrainingModule.findById(id);

  if (!training) {
    throw new Error("Training not found");
  }

  training.isPublished = !training.isPublished;

  await training.save();

  return training;
};





const submitQuiz = async ( id: string,payload: { answers: string[];}) => {

  const training = await TrainingModule.findById(id);

  if (!training) {
    throw new Error("Training not found" );
  }

  if (!training.quizQuestions?.length) {
    throw new Error("Quiz not available");
  }

  let score = 0;

  training.quizQuestions.forEach(
    (quiz, index) => {

      if (
        quiz.correctAnswer ===payload.answers[index]
      ) {
        score++;
      }
    }
  );

  const totalQuestions = training.quizQuestions.length;

  const percentage = (score / totalQuestions) * 100;

  return {
    totalQuestions,
    correctAnswers: score,
    percentage,
  };
};







export const TrainingServices = {
     createTraining,
     getAllTraining,
     getSingleTraining,
     deleteTraining,
     updateTraining,
     getTrainingByRole,
     getPublishedTrainings,
     togglePublishTraining,
     submitQuiz
}