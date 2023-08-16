import { Request, Response } from "express";
import { CartService } from "./cart.service";
import { Result } from "../base/resultModel";
import { baseController } from "../base/controller";
export class CartController {
  constructor(private readonly cartService: CartService) {
    this.cartService = cartService;
  }

  public getCart = (req: Request, res: Response): Promise<Response> => {
    return this.cartService
      .getCart(Number(req.query.userId))
      .then((result) => baseController.sendResult(res, result))
      .catch((e) => {
        return baseController.sendErrorResult(res);
      });
  };

  public addcart = (req: Request, res: Response): Promise<Response> => {
    return this.cartService
      .addCart(req.body)
      .then((result) => baseController.sendResult(res, result))
      .catch((e) => {
        return baseController.sendErrorResult(res);
      });
  };

  public updateCart = (req: Request, res: Response): Promise<Response> => {
    return this.cartService
      .updateCart(req.body)
      .then((result) => baseController.sendResult(res, result))
      .catch((e) => {
        return baseController.sendErrorResult(res);
      });
  };

  public deleteCart = (req: Request, res: Response): Promise<Response> => {
    return this.cartService
      .deleteCart(Number(req.query.id))
      .then((result) => baseController.sendResult(res, result))
      .catch((e) => {
        return baseController.sendErrorResult(res);
      });
  };
}
