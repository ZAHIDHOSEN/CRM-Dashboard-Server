import { Router } from "express";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";
import { AuditLogController } from "./auditLog.controller";





const router = Router()


router.post("/",checkAuth(UserRole.ADMIN),AuditLogController.createAuditLog);
router.get("/",checkAuth(UserRole.ADMIN),AuditLogController.getAllAuditLog);
router.get( "/:id",checkAuth(UserRole.ADMIN),AuditLogController.getSingleAuditLog);







export const AuditLogRoute = router