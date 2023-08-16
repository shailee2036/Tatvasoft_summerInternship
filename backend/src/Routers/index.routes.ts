import express from "express";
import userRouter from "./User.routes";
import categoryRouter from "./Category.routes";
import bookRouter from "./Book.routes";
import cartRouter from "./Cart.routes";
import orderRouter from "./Order.routes";
const router: express.Router = express.Router();

router.use("/user", userRouter);

router.use("/category", categoryRouter);

router.use("/book", bookRouter);

router.use("/cart", cartRouter);

router.use("/order", orderRouter);

export default router;
