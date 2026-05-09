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


const deletePayroll = async(id:string)=>{
  
  const result = await Payroll.findByIdAndDelete(id)
  return result

}



const updatePayroll = async(id:string,payload:Partial<IPayroll>)=>{

  const result = await Payroll.findByIdAndUpdate(id,payload,{
    new:true, runValidators:true
  })
  
  return result
}


// advance

const updatePayrollStatus = async(id:string,status:PayrollStatus)=>{
  const result = await Payroll.findByIdAndUpdate(
    id,
    {status},
   {new:true,runValidators:true}
  )

  return result
}


const getPayrollAnalytics = async () => {
  const total = await Payroll.countDocuments();

  const pending = await Payroll.countDocuments({
    status: PayrollStatus.PENDING,
  });

  const paid = await Payroll.countDocuments({
    status: PayrollStatus.PAID,
  });

  const rejected = await Payroll.countDocuments({
    status: PayrollStatus.REJECTED,
  });

  const totalAmount = await Payroll.aggregate([
    { $match: { status: PayrollStatus.PAID } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return {
    total,
    pending,
    paid,
    rejected,
    totalAmount: totalAmount[0]?.total || 0,
  };
};














export const PayrollServices = {
     createPayroll,
     getAllPayroll,
     getSinglePayroll,
     deletePayroll,
     updatePayroll,
     updatePayrollStatus,
     getPayrollAnalytics
}