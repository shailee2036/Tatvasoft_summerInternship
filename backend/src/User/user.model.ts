import { Joi, Segments } from "celebrate";

export interface UserModel {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  roleId: number;

  role: string;

  password: string;
}

export const UserSchema = {
  byId: {
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  },

  login: {
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string(),
    },
  },

  all: {
    [Segments.QUERY]: {
      pageSize: Joi.number().required(),
      pageIndex: Joi.number().required(),
      keyword: Joi.string(),
    },
  },

  add: {
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required().max(50),
      lastName: Joi.string().required().max(50),
      roleId: Joi.number().required(),
      password: Joi.string().required(),
    }),
  },

  update: {
    [Segments.BODY]: Joi.object({
      id: Joi.number().required(),
      email: Joi.string().email().required(),
      firstName: Joi.string().required().max(50),
      lastName: Joi.string().required().max(50),
      roleId: Joi.number().required(),
      role: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
