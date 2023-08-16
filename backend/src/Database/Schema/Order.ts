import mongoose from "mongoose";
import { OrderModel } from "../../Order/order.model";

const orderSchema = new mongoose.Schema<OrderModel>({
  id: { type: Number, required: true },
  userId: { type: Number, required: true },
  cartIds: { type: [Number], required: true },
  orderDate: { type: Date, required: true },
});

const Order = mongoose.model<OrderModel>("Order", orderSchema);

export default Order;
