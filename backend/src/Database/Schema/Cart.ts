import mongoose, { model } from "mongoose";
import { CartModel } from "../../Cart/cart.model";

const cartSchema = new mongoose.Schema<CartModel>({
  id: { type: Number, required: true },
  bookId: { type: Number, required: true },
  userId: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Cart = model<CartModel>("Cart", cartSchema);

export default Cart;
