import Book from "../Database/Schema/Book";
import Cart from "../Database/Schema/Cart";
import Category from "../Database/Schema/Category";
import { PagincationModel } from "../base/paginationModel";
import { Result } from "../base/resultModel";
import { ErrorCode, HttpStatusCode } from "../utility/enum";
import { BookModel } from "./book.model";

export class BookRepository {
  public getBooks = async (
    pageSize: number,
    pageNumber: number,
    keyword?: string
  ): Promise<Result<PagincationModel<BookModel>>> => {
    const pageIndex = pageNumber - 1 < 0 ? 0 : pageNumber - 1;
    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const skip = pageIndex * pageSize;

    const items = await Book.find(query).skip(skip).limit(pageSize);
    const totalItems = await Book.countDocuments(query);
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
  };

  public getById = async (
    bookId: number
  ): Promise<Result<BookModel | null>> => {
    const book = await Book.findOne({ id: bookId });
    return new Result({
      code: book ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
      key: book ? ErrorCode.Ok : ErrorCode.NotFound,
      result: book,
    });
  };

  public getAllBooks = async (): Promise<Result<BookModel[]>> => {
    const bookList = await Book.find({});
    return new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result: bookList,
    });
  };

  public updateBook = async (
    bookDetails: BookModel
  ): Promise<Result<BookModel | null>> => {
    const category = await Category.findOne({ id: bookDetails.categoryId });

    if (!category) {
      return new Result({
        code: HttpStatusCode.NotFound,
        key: ErrorCode.NotFound,
        error: `Category with id ${bookDetails.categoryId} not found.`,
      });
    }

    return Book.findOneAndUpdate(
      { id: bookDetails.id },
      { ...bookDetails, category: category?.name }
    )
      .then((result) => {
        return new Result({
          code: result ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
          key: result ? ErrorCode.Ok : ErrorCode.NotFound,
          result: result
            ? {
                ...bookDetails,
                category: category?.name,
              }
            : null,
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
          error: e.code === 11000 ? "Book with same name already exist." : "",
        });
      });
  };

  public createBook = async (
    bookDetail: BookModel
  ): Promise<Result<BookModel | null>> => {
    try {
      // Check if a book with the same name already exists
      const existingBook = await Book.findOne({ name: bookDetail.name });
      if (existingBook) {
        return new Result({
          code: HttpStatusCode.ConflictError,
          key: ErrorCode.Conflict,
          error:
            "Book with same name already exist. Please choose a different name!",
        });
      }

      // Get the current maximum ID value from the database and increment it by one
      const maxIdBook = await Book.findOne({})
        .sort({ id: -1 })
        .select("id")
        .exec();
      const newBookId = maxIdBook ? Number(maxIdBook.id) + 1 : 1;

      const category = await Category.findOne({ id: bookDetail.categoryId });

      if (!category) {
        return new Result({
          code: HttpStatusCode.NotFound,
          key: ErrorCode.NotFound,
          error: `Category with id ${bookDetail.categoryId} not found.`,
        });
      }

      // Create a new book object with the generated ID and input data
      const newBook = new Book({
        id: newBookId,
        name: bookDetail.name,
        description: bookDetail.description,
        price: bookDetail.price,
        categoryId: bookDetail.categoryId,
        category: category.name,
        base64image: bookDetail.base64image,
      });

      // Save the new book object to the database
      const savedBook = await newBook.save();
      return new Result({
        code: HttpStatusCode.Ok,
        key: ErrorCode.Ok,
        result: savedBook,
      });
    } catch (error: any) {
      return new Result({
        code:
          error.code === 11000
            ? HttpStatusCode.ConflictError
            : HttpStatusCode.InternalServerError,
        key:
          error.code === 11000
            ? ErrorCode.Conflict
            : ErrorCode.InternalServerError,
        error: error.code === 11000 ? "Confilct" : "",
      });
    }
  };

  public deleteBook = async (bookId: number): Promise<Result<boolean>> => {
    try {
      // Check if the book with the specified ID exists
      const book = await Book.findOne({ id: bookId });
      if (!book) {
        return new Result({
          code: HttpStatusCode.NotFound,
          key: ErrorCode.NotFound,
          error: `Book with ID ${bookId} not found`,
        });
      }

      if ((await Cart.find({ bookId: bookId })).length > 0) {
        return new Result({
          code: HttpStatusCode.Forbidden,
          key: ErrorCode.Forbidden,
          error: `Foreign key error, Book added in user's cart`,
        });
      }
      // Delete the book from the database
      await Book.deleteOne({ id: bookId });

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
  };

  public searchBook = async (keyword: string): Promise<Result<BookModel[]>> => {
    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const items = await Book.find(query);
    return new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result: items,
    });
  };
}
