import { PagincationModel } from "../base/paginationModel";
import { Result } from "../base/resultModel";
import { CategoryModel } from "./category.model";
import { CategoryRespository } from "./category.repository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRespository) {}

  public async getAllCategories(): Promise<Result<CategoryModel[]>> {
    return this.categoryRepository.getAllCategories();
  }

  public async getCategories(
    pageSize: number,
    pageIndex: number,
    keyword?: string
  ): Promise<Result<PagincationModel<CategoryModel>>> {
    return this.categoryRepository.getCategories(pageSize, pageIndex, keyword);
  }

  public async getCategoryById(
    categoryId: number
  ): Promise<Result<CategoryModel | null>> {
    return this.categoryRepository.getById(categoryId);
  }

  public async createCategory(
    categoryDetail: CategoryModel
  ): Promise<Result<CategoryModel | null>> {
    return this.categoryRepository.createCategory(categoryDetail);
  }

  public async updateCategory(
    categoryDetail: CategoryModel
  ): Promise<Result<CategoryModel | null>> {
    return this.categoryRepository.updateCategory(categoryDetail);
  }

  public async deleteCategory(categoryId: number): Promise<Result<boolean>> {
    return this.categoryRepository.deleteCategory(categoryId);
  }
}
