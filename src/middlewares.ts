import ErrorResponse from "./interfaces/Responses/ErrorResponse";
import CustomError from "./classes/CustomError";
import { NextFunction, Response, Request } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`End point not Found: ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  console.error("errorHandler", err.message);
  res.status(err.status || 500);
  const response: ErrorResponse = {
    message: err.message,
  };
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }
  res.json(response);
};

export { notFound, errorHandler };
