import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ","");
      
      if (!token) {
        throw new Error("Unauthorized: No token");
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string
      ) as any;

      req.user = decoded;

      //  Role check
      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Forbidden: You are not allowed");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};