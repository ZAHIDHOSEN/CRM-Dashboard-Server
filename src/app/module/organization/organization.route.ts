import { Router } from "express";
import { OrganizationController } from "./organization.controller";
import { checkAuth } from "../../middleware/authMiddleware";
import { UserRole } from "../user/user.interface";




const router = Router()

router.post("/",checkAuth(),OrganizationController.createOrganization)
router.patch("/:id",checkAuth(),OrganizationController.updateOrganization)
router.delete("/:id",checkAuth(),OrganizationController.deleteOrganization)
router.get("/",checkAuth(UserRole.ADMIN),OrganizationController.getAllOrganization)
router.get("/:id",checkAuth(UserRole.ADMIN),OrganizationController.getSingleOrganization)
// advance 
router.get("/me",checkAuth(),OrganizationController.getMyOrganization)






export const OrganizationRoute = router