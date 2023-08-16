import mongoose, { model } from "mongoose";
import { CategoryModel } from "../../Category/category.model";

const categorySchema = new mongoose.Schema<CategoryModel>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const Category = model<CategoryModel>("category", categorySchema);

export default Category;
