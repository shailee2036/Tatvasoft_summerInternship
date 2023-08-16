import express from "express";
import { celebrate } from "celebrate";
import { wrap } from "../base/middleware";
import { CategoryRespository } from "../Category/category.repository";
import { CategoryService } from "../Category/category.service";
import { CategoryController } from "../Category/category.controller";
import { CategorySchema } from "../Category/category.model";

const categoryRouter: express.Router = express.Router();

const repo: CategoryRespository = new CategoryRespository();
const service: CategoryService = new CategoryService(repo);
const controller: CategoryController = new CategoryController(service);

categoryRouter.get("/all", wrap(controller.getAllCategories));

categoryRouter.get(
  "/",
  celebrate(CategorySchema.all),
  wrap(controller.getCategories)
);

categoryRouter.get(
  "/byId",
  celebrate(CategorySchema.byId),
  wrap(controller.getCategoryById)
);

categoryRouter.post(
  "/",
  celebrate(CategorySchema.add),
  wrap(controller.createCategory)
);

categoryRouter.put(
  "/",
  celebrate(CategorySchema.update),
  wrap(controller.updateCategory)
);

categoryRouter.delete(
  "/",
  celebrate(CategorySchema.byId),
  wrap(controller.deleteCategory)
);

export default categoryRouter;
