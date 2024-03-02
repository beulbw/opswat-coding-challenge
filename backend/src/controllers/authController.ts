import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { User } from "../models/User";
import { AuthenticationError, BadRequestError } from "../utilities/CustomError";
import { DataResponse } from "../utilities/DataResponse";

export const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, username, fullname, password } = request.body;
    let check = await User.count({ where: { email } });
    if (check > 0) {
      throw new BadRequestError(
        "This email has already been registered to another user"
      );
    }
    check = await User.count({ where: { username } });
    if (check > 0) {
      throw new BadRequestError(
        "This username has already been registered to another user"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      username,
      fullname,
      password: hashedPassword,
    });
    const body = new DataResponse.Builder()
      .withCode(201)
      .withMessage("Registration completed successfully")
      .build();
    response.status(201).json(body);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AuthenticationError("Cannot find any user with this email");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AuthenticationError("Invalid password");
    }
    const token = jwt.sign({ email: user.email }, CONFIG.JWT.SECRET_KEY, {
      expiresIn: "1h",
    });
    const body = new DataResponse.Builder()
      .withCode(200)
      .withMessage("Logged in successfully")
      .withResult({
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        token,
      })
      .build();
    response.status(200).json(body);
  } catch (error: any) {
    next(error);
  }
};
