import { Request, Response, NextFunction } from "express";

import { AppError } from "../exceptions/AppError.js";

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(
    new AppError(
      "Route not found",
      404
    )
  );
};
