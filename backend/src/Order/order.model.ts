import { Segments } from "celebrate";
import Joi from "joi";

export interface OrderModel {
  id: number;

  userId: number;

  cartIds: number[];

  orderDate: Date;
}

export const OrderSchema = {
  add: {
    [Segments.BODY]: {
      userId: Joi.number().required(),
      cartIds: Joi.array().items(Joi.number()).required(),
    },
  },
};
