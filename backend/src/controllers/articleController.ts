import { NextFunction, Request, Response } from "express";
import { Article } from "../models/Article";
import { isValidId } from "../utilities/CommonUtils";
import {
  BadRequestError,
  CommonError,
  NotFoundError,
} from "../utilities/CustomError";
import { CommonResponse } from "../utilities/DataResponse";

export const listArticle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result = await Article.findAll({
      order: [["id", "DESC"]],
    });
    const bodyResponse = { ...CommonResponse.SUCCESSFUL, result };
    response.status(bodyResponse.code).json(bodyResponse);
  } catch (error: any) {
    next(error);
  }
};

export const createArticle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { title, body } = request.body;
    await Article.create({
      title,
      body: body ?? "",
    });
    const bodyResponse = CommonResponse.CREATED;
    response.status(bodyResponse.code).json(bodyResponse);
  } catch (error: any) {
    next(error);
  }
};

export const updateArticle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const articleId = request.params.article_id;
    if (!isValidId(articleId)) {
      throw new BadRequestError("Invalid article ID");
    }
    const item = await Article.findByPk(articleId);
    if (!item) {
      throw new NotFoundError("Cannot find any article with this ID");
    }
    const { title, body } = request.body;
    await Article.update(
      {
        title,
        body: body ?? "",
      },
      { where: { id: articleId } }
    );
    const bodyResponse = CommonResponse.SUCCESSFUL;
    response.status(bodyResponse.code).json(bodyResponse);
  } catch (error: any) {
    next(error);
  }
};

export const deleteArticle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const articleId = request.params.article_id;
    if (!isValidId(articleId)) {
      throw new BadRequestError("Invalid article ID");
    }
    const item = await Article.findByPk(articleId);
    if (!item) {
      throw new NotFoundError("Cannot find any article with this ID");
    }
    const result = await Article.destroy({ where: { id: articleId } });
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

export const favouriteArticle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const articleId = request.params.article_id;
    if (!isValidId(articleId)) {
      throw new BadRequestError("Invalid article ID");
    }
    const item = await Article.findByPk(articleId);
    if (!item) {
      throw new NotFoundError("Cannot find any article with this ID");
    }
    await item.increment("favourite_count");
    const bodyResponse = CommonResponse.SUCCESSFUL;
    response.status(bodyResponse.code).json(bodyResponse);
  } catch (error: any) {
    next(error);
  }
};

export const unfavouriteArticle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const articleId = request.params.article_id;
    if (!isValidId(articleId)) {
      throw new BadRequestError("Invalid article ID");
    }
    const item = await Article.findByPk(articleId);
    if (!item) {
      throw new NotFoundError("Cannot find any article with this ID");
    }
    if (item.favouriteCount === 0) {
      throw new BadRequestError("Article has not been favourited");
    }
    await item.decrement("favourite_count");
    const bodyResponse = CommonResponse.SUCCESSFUL;
    response.status(bodyResponse.code).json(bodyResponse);
  } catch (error: any) {
    next(error);
  }
};
