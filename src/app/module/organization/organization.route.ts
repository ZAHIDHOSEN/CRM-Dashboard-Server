import { Router } from "express";
import { OrganizationController } from "./organization.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";




const router = Router()

router.post("/",checkAuth(),OrganizationController.createOrganization)





export const OrganizationRoute = router