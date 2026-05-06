import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { OrganizationServices } from "./organization.services"


const createOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
    const payload = req.body
    const adminId = req.user._id
    const result = await OrganizationServices.createOrganization(payload,adminId)
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message:"organization created successfully",
        data: result


     })
})




const updateOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const id = req.params.id as string
    const payload = req.body
   
    const result = await OrganizationServices.updateOrganization(payload,id)
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"organization updated successfully",
        data: result


     })
})





const deleteOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
   const id = req.params.id as string

    await OrganizationServices.deleteOrganization(id)
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"organization deleted successfully",
        data: null


     })
})


const getAllOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    
       const result = await OrganizationServices.getAllOrganization()
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"organization get successfully",
        data: result


     })
})

const getSingleOrganization = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
       
        const id = req.params.id as string
        const result = await OrganizationServices.getSingleOrganization(id)
 
  
       sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"SingleOrganization get successfully",
        data: result


     })
})







export const OrganizationController ={
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getAllOrganization,
    getSingleOrganization
}