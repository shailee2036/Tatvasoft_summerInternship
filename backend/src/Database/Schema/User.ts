import mongoose, { model } from "mongoose";
import { UserModel } from "../../User/user.model";

const userSchema = new mongoose.Schema<UserModel>({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roleId: { type: Number, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<UserModel>("users", userSchema);

export default User;
