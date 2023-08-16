import express from "express";
import { celebrate } from "celebrate";
import { wrap } from "../base/middleware";
import { OrderRepository } from "../Order/order.repository";
import { OrderService } from "../Order/order.service";
import { OrderController } from "../Order/order.controller";
import { OrderSchema } from "../Order/order.model";

const orderRouter: express.Router = express.Router();

const repo: OrderRepository = new OrderRepository();
const service: OrderService = new OrderService(repo);
const controller: OrderController = new OrderController(service);

orderRouter.post("/", celebrate(OrderSchema.add), wrap(controller.addOrder));

export default orderRouter;
