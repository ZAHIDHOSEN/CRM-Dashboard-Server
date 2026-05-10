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









export const TrainingServices = {
     createTraining,
     getAllTraining
}