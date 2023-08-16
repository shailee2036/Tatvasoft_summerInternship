import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { baseController } from "../base/controller";
import { CategoryModel } from "./category.model";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  public getCategories = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { pageIndex, pageSize, keyword } = req.query;
    return this.categoryService
      .getCategories(
        Number(pageSize),
        Number(pageIndex),
        keyword ? String(keyword) : ""
      )
      .then((result) => baseController.sendResult(res, result))
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public getAllCategories = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return this.categoryService
      .getAllCategories()
      .then((result) => baseController.sendResult(res, result))
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public getCategoryById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.query;

    return this.categoryService
      .getCategoryById(Number(id))
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public updateCategory = async (
    req: Request<{}, {}, CategoryModel>,
    res: Response
  ): Promise<Response> => {
    const category = req.body;
    return this.categoryService
      .updateCategory(category)
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public createCategory = async (
    req: Request<{}, {}, CategoryModel>,
    res: Response
  ): Promise<Response> => {
    const category = req.body;

    return this.categoryService
      .createCategory(category)
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.query;

    return this.categoryService
      .deleteCategory(Number(id))
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };
}
