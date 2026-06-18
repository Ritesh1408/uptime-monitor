import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { AppError } from "../exceptions/AppError.js";
import { sendError } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/http-status.js";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Zod Validation Error
  if (error instanceof ZodError) {
    return sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      error.issues[0]?.message || "Validation failed"
    );
  }

  // Custom App Error
  if (error instanceof AppError) {
    return sendError(
      res,
      error.statusCode,
      error.message
    );
  }

  if (error instanceof mongoose.Error.CastError) {
  return sendError(
    res,
    HTTP_STATUS.BAD_REQUEST,
    "Invalid resource id"
  );
}

  console.error(error);

  return sendError(
    res,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    "Internal Server Error"
  );
};