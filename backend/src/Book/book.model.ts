import { Joi, Segments } from "celebrate";

export interface BookModel {
  id: number;

  name: string;

  description: string;

  price: number;

  categoryId: number;

  category: string;

  base64image: string;
}

export const BookSchema = {
  add: {
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      categoryId: Joi.number().required(),
      base64image: Joi.any().required(),
    }),
  },

  update: {
    [Segments.BODY]: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      categoryId: Joi.number().required(),
      base64image: Joi.any().required(),
    }),
  },

  byId: {
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  },

  all: {
    [Segments.QUERY]: {
      pageSize: Joi.number().required(),
      pageIndex: Joi.number().required(),
      keyword: Joi.string(),
    },
  },

  search: {
    [Segments.QUERY]: {
      keyword: Joi.string().required(),
    },
  },
};
