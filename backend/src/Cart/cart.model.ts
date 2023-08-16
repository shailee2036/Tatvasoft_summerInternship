import { Segments } from "celebrate";
import Joi from "joi";

export interface CartModel {
  id: number;

  bookId: number;

  userId: number;

  quantity: number;
}

export const CartSchema = {
  add: {
    [Segments.BODY]: {
      bookId: Joi.number().required(),
      userId: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  },

  update: {
    [Segments.BODY]: {
      id: Joi.number().required(),
      bookId: Joi.number().required(),
      userId: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  },

  byId: {
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  },

  get: {
    [Segments.QUERY]: {
      userId: Joi.number().required(),
    },
  },
};
