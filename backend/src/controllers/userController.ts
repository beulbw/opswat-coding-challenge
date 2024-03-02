import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import {
  BadRequestError,
  CommonError,
  NotFoundError,
} from "../utilities/CustomError";
import { CommonResponse } from "../utilities/DataResponse";
import { getCurrentUser } from "../middlewares/authMiddleware";
import { User } from "../models/User";

export const listUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result = await User.findAll({
      where: { email: { [Op.ne]: getCurrentUser(request) } },
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
    });
    const bodyResponse = { ...CommonResponse.SUCCESSFUL, result };
    response.status(bodyResponse.code).json(bodyResponse);
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const email = request.params.email;
    if (!email) {
      throw new BadRequestError("Invalid user email");
    }
    if (email === getCurrentUser(request)) {
      throw new BadRequestError(
        "The provided email is registered with the current user"
      );
    }
    const item = await User.findOne({ where: { email } });
    if (!item) {
      throw new NotFoundError("Cannot find any user with this email");
    }
    const result = await User.destroy({ where: { email } });
    if (result > 0) {
      const bodyResponse = CommonResponse.SUCCESSFUL;
      response.status(bodyResponse.code).json(bodyResponse);
    } else {
      throw new CommonError();
    }
  } catch (error: any) {
    next(error);
  }
};
