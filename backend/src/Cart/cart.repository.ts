import Book from "../Database/Schema/Book";
import Cart from "../Database/Schema/Cart";
import User from "../Database/Schema/User";
import { Result } from "../base/resultModel";
import { ErrorCode, HttpStatusCode } from "../utility/enum";
import { CartModel } from "./cart.model";

export class CartRepository {
  public getCart = async (id: number): Promise<Result<CartModel[]>> => {
    const carts = await Cart.aggregate([
      { $match: { userId: id } },
      {
        $lookup: {
          from: "books", // Replace "books" with the actual name of your book collection
          localField: "bookId",
          foreignField: "id",
          as: "book",
        },
      },
      {
        $unwind: {
          path: "$book",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          id: "$id",
          bookId: "$bookId",
          userId: "$userId",
          quantity: "$quantity",
          book: "$book",
        },
      },
    ]);
    const result = new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result: carts,
    });
    return result;
  };

  public addCart = async (
    cartDetail: CartModel
  ): Promise<Result<CartModel>> => {
    if (
      !!(await Cart.findOne({
        userId: cartDetail.userId,
        bookId: cartDetail.bookId,
      }))
    ) {
      return new Result({
        code: HttpStatusCode.ConflictError,
        key: ErrorCode.Conflict,
        error: "Book already added in cart",
      });
    }

    if (
      !(await Book.findOne({
        id: cartDetail.bookId,
      })) ||
      !(await User.findOne({
        id: cartDetail.userId,
      }))
    ) {
      return new Result({
        code: HttpStatusCode.NotFound,
        key: ErrorCode.NotFound,
        error: "Book or user is not available",
      });
    }

    const maxIdCart = await Cart.findOne({})
      .sort({ id: -1 })
      .select("id")
      .exec();
    const newCartId = maxIdCart ? Number(maxIdCart.id) + 1 : 1;

    const newCart = new Cart({
      ...cartDetail,
      id: newCartId,
    });

    const savedCart = await newCart.save();

    const result = new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result: savedCart,
    });
    return result;
  };

  public updateCart = async (
    cartDetail: CartModel
  ): Promise<Result<CartModel | null>> => {
    if (
      !(await Book.findOne({
        id: cartDetail.bookId,
      })) ||
      !(await User.findOne({
        id: cartDetail.userId,
      }))
    ) {
      return new Result({
        code: HttpStatusCode.NotFound,
        key: ErrorCode.NotFound,
        error: "Book or user is not available",
      });
    }

    return Cart.findOneAndUpdate({ id: cartDetail.id }, { ...cartDetail })
      .then((result) => {
        return new Result({
          code: result ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
          key: result ? ErrorCode.Ok : ErrorCode.NotFound,
          result: {
            id: cartDetail.id,
            bookId: cartDetail.bookId,
            quantity: cartDetail.quantity,
            userId: cartDetail.userId,
          },
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
          error: e,
        });
      });
  };

  public deleteCart = async (cartId: number): Promise<Result<boolean>> => {
    try {
      // Check if the book with the specified ID exists
      const cart = await Cart.findOne({ id: cartId });
      if (!cart) {
        return new Result({
          code: HttpStatusCode.NotFound,
          key: ErrorCode.NotFound,
          error: `Cart with ID ${cartId} not found`,
        });
      }

      // Delete the book from the database
      await Cart.deleteOne({ id: cartId });

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
}
