import express from "express";
import { celebrate } from "celebrate";
import { wrap } from "../base/middleware";
import { CartRepository } from "../Cart/cart.repository";
import { CartService } from "../Cart/cart.service";
import { CartController } from "../Cart/cart.controller";
import { CartSchema } from "../Cart/cart.model";

const cartRouter: express.Router = express.Router();

const repo: CartRepository = new CartRepository();
const service: CartService = new CartService(repo);
const controller: CartController = new CartController(service);

cartRouter.get("/", celebrate(CartSchema.get), wrap(controller.getCart));

cartRouter.post("/", celebrate(CartSchema.add), wrap(controller.addcart));

cartRouter.put("/", celebrate(CartSchema.update), wrap(controller.updateCart));

cartRouter.delete("/", celebrate(CartSchema.byId), wrap(controller.deleteCart));

export default cartRouter;
