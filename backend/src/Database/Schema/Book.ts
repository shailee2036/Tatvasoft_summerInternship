import mongoose, { model } from "mongoose";
import { BookModel } from "../../Book/book.model";

const bookSchema = new mongoose.Schema<BookModel>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: Number, required: true },
  category: { type: String, required: true },
  base64image: { type: String, required: true },
});

const Book = model<BookModel>("book", bookSchema);

export default Book;
