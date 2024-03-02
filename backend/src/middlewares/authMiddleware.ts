import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { DataResponse } from "../utilities/DataResponse";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization") ?? "";
    console.log("log: Authorization token", token)
    if (!token) {
      const body = new DataResponse.Builder()
        .withCode(401)
        .withMessage("Access denied")
        .withDescription("Not authorized to access requested resource")
        .build();
      return res.status(401).json(body);
    }
    const decoded = jwt.verify(token.split(" ")[1], CONFIG.JWT.SECRET_KEY);
    console.log("log: decoded", decoded);
    next();
  } catch (error) {
    const body = new DataResponse.Builder()
      .withCode(401)
      .withMessage("Invalid token")
      .withDescription("The provided token is malformed or has been expired")
      .build();
    res.status(401).json(body);
  }
}

export function getCurrentUser(req: Request) {
  try {
    const token = req.header("Authorization") ?? "";
    if (token) {
      const decoded: any = jwt.verify(
        token.split(" ")[1],
        CONFIG.JWT.SECRET_KEY
      );
      return decoded.email;
    }
  } catch (error: any) {
    return null;
  }
  return null;
}
