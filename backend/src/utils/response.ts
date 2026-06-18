import { Response } from "express";
import { ApiResponse } from "../types/api-response.js";

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  const response: ApiResponse = {
    success: false,
    message,
  };

  return res.status(statusCode).json(response);
};
