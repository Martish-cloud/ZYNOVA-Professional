import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env.js";

export const requireAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const apiKey = req.headers["x-api-key"] as string | undefined;

  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : apiKey;

  if (!token || token !== ENV.ADMIN_API_KEY) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing admin API key."
    });
    return;
  }

  next();
};
