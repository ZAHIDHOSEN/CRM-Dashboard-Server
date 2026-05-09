import { IPayroll, PayrollStatus } from "./payroll.interface"
import { Payroll } from "./payroll.model"



const createPayroll = async(payload:Partial<IPayroll>)=>{
   
    const result = await Payroll.create(payload)
    return result
}


const getAllPayroll = async (query: Record<string, unknown>) => {

//   const filter: FilterQuery<IPayroll> = {};

//   if (query.status) {
//     filter.status = query.status as PayrollStatus;
//   }

//   if (query.user) {
//     filter.user = query.user;
//   }

//   if (query.organization) {
//     filter.organization = query.organization;
//   }

//   if (query.type) {
//     filter.type = query.type;
//   }

  const result = await Payroll.find(query)
    .populate("user")
    .populate("organization")
    .populate("createdBy")
    .sort({ createdAt: -1 });

  return result;
};



const getSinglePayroll = async (id: string) => {
  const result = await Payroll.findById(id)
    .populate("user")
    .populate("organization")
    .populate("createdBy");

  return result;
};











export const PayrollServices = {
     createPayroll,
     getAllPayroll,
     getSinglePayroll
}