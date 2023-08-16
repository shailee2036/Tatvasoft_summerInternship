import Cart from "../Database/Schema/Cart";
import Order from "../Database/Schema/Order";
import { Result } from "../base/resultModel";
import { OrderModel } from "./order.model";
import { ErrorCode, HttpStatusCode } from "../utility/enum";
import User from "../Database/Schema/User";

export class OrderRepository {
  public addOrder = async (orderDetails: OrderModel) => {
    try {
      // Create a new order in the database

      // Delete the carts associated with the order from the Cart collection

      if (
        !(await User.findOne({
          id: orderDetails.userId,
        }))
      ) {
        return new Result({
          code: HttpStatusCode.NotFound,
          key: ErrorCode.NotFound,
          error: "User is not available",
        });
      }

      const maxIdOrder = await Order.findOne({})
        .sort({ id: -1 })
        .select("id")
        .exec();
      const newOrderId = maxIdOrder ? Number(maxIdOrder.id) + 1 : 1;

      const newOrder = new Order({
        ...orderDetails,
        id: newOrderId,
        orderDate: new Date(),
      });

      const savedOrder = await newOrder.save();

      await Cart.deleteMany({ id: { $in: orderDetails.cartIds } });
      const result = new Result({
        code: HttpStatusCode.Ok,
        key: ErrorCode.Ok,
        result: savedOrder,
      });
      return result;
    } catch (error) {
      return new Result({
        code: HttpStatusCode.InternalServerError,
        key: ErrorCode.InternalServerError,
      });
    }
  };
}
