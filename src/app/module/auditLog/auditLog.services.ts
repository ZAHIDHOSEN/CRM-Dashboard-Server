import { IAuditLog } from "./auditLog.interface";
import { AuditLog } from "./auditLog.model";



const createAuditLog = async (payload: IAuditLog) => {

  const result = await AuditLog.create(payload);

  return result;
};



const getAllAuditLogs = async () => {

  const result = await AuditLog.find()
    .populate("user", "name email role")
    .populate("organization", "name")
    .sort({ createdAt: -1 });

  return result;
};


const getSingleAuditLog = async (id: string) => {

  const result = await AuditLog.findById(id)
    .populate("user", "name email role")
    .populate("organization", "name");

  return result;
};










export const AuditLogServices = {
   createAuditLog,
   getAllAuditLogs,
   getSingleAuditLog
}