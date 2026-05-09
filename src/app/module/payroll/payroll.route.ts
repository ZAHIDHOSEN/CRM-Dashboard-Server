import { Router } from "express";
import { PayrollController } from "./payroll.controller";
import { checkAuth } from "../../middleware/authMiddleware";




const router = Router()


router.post("/",checkAuth(),PayrollController.createPayroll)
router.get("/",checkAuth(),PayrollController.getAllPayroll)

// dynamic
router.get("/:id",checkAuth(),PayrollController.getSinglePayroll)




export const PayrollRoute = router