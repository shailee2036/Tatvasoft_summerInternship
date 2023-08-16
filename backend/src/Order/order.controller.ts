import { Request, Response } from "express";
import { baseController } from "../base/controller";
import { OrderService } from "./order.service";

export class OrderController {
  constructor(private readonly orderService: OrderService) {
    this.orderService = orderService;
  }

  public addOrder = async (req: Request, res: Response): Promise<Response> => {
    return this.orderService
      .addOrder(req.body)
      .then((result) => baseController.sendResult(res, result))
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };
}
