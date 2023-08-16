import Book from "../Database/Schema/Book";
import Category from "../Database/Schema/Category";
import { PagincationModel } from "../base/paginationModel";
import { Result } from "../base/resultModel";
import { ErrorCode, HttpStatusCode } from "../utility/enum";
import { CategoryModel } from "./category.model";

export class CategoryRespository {
  public async getCategories(
    pageSize: number,
    pageNumber: number,
    keyword?: string
  ): Promise<Result<PagincationModel<CategoryModel>>> {
    const pageIndex = pageNumber - 1 < 0 ? 0 : pageNumber - 1;
    const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
    const skip = pageIndex * pageSize;

    const items = await Category.find(query).skip(skip).limit(pageSize);
    const totalItems = await Category.countDocuments(query);
    const result = new PagincationModel({
      pageIndex,
      pageSize,
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    });
    return new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result,
    });
  }

  public async getAllCategories(): Promise<Result<CategoryModel[]>> {
    const categories = await Category.find({});
    return new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result: categories,
    });
  }

  public getById = async (
    categoryId: number
  ): Promise<Result<CategoryModel | null>> => {
    const category = await Category.findOne({ id: categoryId });
    return new Result({
      code: category ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
      key: category ? ErrorCode.Ok : ErrorCode.NotFound,
      result: category,
    });
  };

  public updateCategory = async (
    categoryDetails: CategoryModel
  ): Promise<Result<CategoryModel | null>> => {
    return Category.findOneAndUpdate(
      { id: categoryDetails.id },
      { ...categoryDetails }
    )
      .then((result) => {
        return new Result({
          code: result ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
          key: result ? ErrorCode.Ok : ErrorCode.NotFound,
          result,
        });
      })
      .catch((e) => {
        return new Result({
          code:
            e.code === 11000
              ? HttpStatusCode.ConflictError
              : HttpStatusCode.InternalServerError,
          key:
            e.code === 11000
              ? ErrorCode.Conflict
              : ErrorCode.InternalServerError,
          error: e.code === 11000 ? "Category already exist" : "",
        });
      });
  };

  public createCategory = async (
    categoryDetail: CategoryModel
  ): Promise<Result<CategoryModel | null>> => {
    try {
      // Check if a category with the same name already exists
      const existingCategory = await Category.findOne({
        name: categoryDetail.name,
      });
      if (existingCategory) {
        return new Result({
          code: HttpStatusCode.ConflictError,
          key: ErrorCode.Conflict,
          error: "Category already exists.",
        });
      }

      // Get the current maximum ID value from the database and increment it by one
      const maxIdCategory = await Category.findOne({})
        .sort({ id: -1 })
        .select("id")
        .exec();
      const newCategoryId = maxIdCategory ? Number(maxIdCategory.id) + 1 : 1;

      // Create a new category object with the generated ID and input data
      const newCategory = new Category({
        id: newCategoryId,
        name: categoryDetail.name,
      });

      // Save the new category object to the database
      const savedCategory = await newCategory.save();
      return new Result({
        code: HttpStatusCode.Ok,
        key: ErrorCode.Ok,
        result: savedCategory,
      });
    } catch (error: any) {
      return new Result({
        code: HttpStatusCode.InternalServerError,
        key: ErrorCode.InternalServerError,
        error: error,
      });
    }
  };

  public async deleteCategory(categoryId: number): Promise<Result<boolean>> {
    try {
      // Check if the category with the specified ID exists
      const category = await Category.findOne({ id: categoryId });
      if (!category) {
        return new Result({
          code: HttpStatusCode.NotFound,
          key: ErrorCode.NotFound,
          error: `Category with ID ${categoryId} not found`,
        });
      }

      if ((await Book.find({ categoryId })).length > 0) {
        return new Result({
          code: HttpStatusCode.Forbidden,
          key: ErrorCode.Forbidden,
          error: `Foreign key error, Books found with this category.`,
        });
      }

      // Delete the category from the database
      await Category.deleteOne({ id: categoryId });

      return new Result({
        code: HttpStatusCode.Ok,
        key: ErrorCode.Ok,
        result: true,
      });
    } catch (error: any) {
      return new Result({
        code: HttpStatusCode.InternalServerError,
        key: ErrorCode.InternalServerError,
        error: error,
      });
    }
  }
}
