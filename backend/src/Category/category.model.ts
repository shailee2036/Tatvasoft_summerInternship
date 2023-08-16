import { Joi, Segments } from "celebrate";

export interface CategoryModel {
  id: number;

  name: string;
}

export const CategorySchema = {
  byId: {
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  },

  all: {
    [Segments.QUERY]: {
      pageSize: Joi.number().required(),
      pageIndex: Joi.number().required(),
      keyword: Joi.string().optional(),
    },
  },

  add: {
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
    }),
  },

  update: {
    [Segments.BODY]: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    }),
  },
};
