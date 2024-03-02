import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utilities/CustomError";
import { DataResponse } from "../utilities/DataResponse";

export function errorLogger(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(`${error.stack}`);
  next(error);
}

export function errorHandler(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.statusCode || 500;
  const body = new DataResponse.Builder()
    .withCode(status)
    .withMessage(error.message)
    .build();
  if (error.name !== "Error") {
    body.description = error.name;
  }
  response.status(status).json(body);
}

export function notFoundErrorHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const body = new DataResponse.Builder()
    .withCode(404)
    .withMessage("Resource not found: " + request.url)
    .build();
  response.status(404).json(body);
}
