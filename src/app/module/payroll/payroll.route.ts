import { Router } from "express";
import { PayrollController } from "./payroll.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";




const router = Router()


router.post("/",checkAuth(UserRole.ADMIN,UserRole.LEADER),PayrollController.createPayroll)
router.get("/",checkAuth(UserRole.ADMIN,UserRole.LEADER),PayrollController.getAllPayroll)
// advance
 router.get("/analytics",checkAuth(UserRole.ADMIN),PayrollController.getPayrollAnalytics)
 router.patch("/:id/status",checkAuth(UserRole.ADMIN),PayrollController.updatePayroll)

// dynamic
router.get("/:id",checkAuth(),PayrollController.getSinglePayroll)
router.patch("/:id",checkAuth(UserRole.ADMIN,UserRole.LEADER),PayrollController.updatePayroll)
router.delete("/:id",checkAuth(UserRole.ADMIN),PayrollController.deletePayroll)



export const PayrollRoute = router