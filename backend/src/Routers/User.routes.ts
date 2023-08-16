import express from "express";
import { celebrate } from "celebrate";
import { UserRepository } from "../User/user.repository";
import { UserService } from "../User/user.service";
import { UserController } from "../User/user.controller";
import { wrap } from "../base/middleware";
import { UserSchema } from "../User/user.model";

const userRouter: express.Router = express.Router();

const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo);
const controller: UserController = new UserController(service);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         roleId:
 *           type: number
 *         role:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - id
 *         - email
 *         - firstName
 *         - lastName
 *         - roleId
 *         - role
 *         - password
 *       example:
 *         id: 1
 *         email: john.doe@example.com
 *         firstName: John
 *         lastName: Doe
 *         roleId: 2
 *         role: buyer
 *         password: secret
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get a list of users
 *     description: Returns a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserModel'
 */
userRouter.get("/all", wrap(controller.getAllUsers));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a paginated list of users
 *     description: Returns a paginated list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Index of the page to return
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items to return per page
 *     responses:
 *       200:
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageIndex:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserModel'
 *                 totalItems:
 *                   type: integer
 *               example:
 *                 pageIndex: 0
 *                 pageSize: 1
 *                 totalPages: 4
 *                 items:
 *                   - id: 5
 *                     firstName: Keval
 *                     lastName: asdasd
 *                     email: bruce@wayne.com
 *                     roleId: 3
 *                     role: admin
 *                     password: 12345
 *                 totalItems: 4
 *
 */
userRouter.get("/", celebrate(UserSchema.all), wrap(controller.getUsers));

userRouter.get(
  "/byId",
  celebrate(UserSchema.byId),
  wrap(controller.getUserById)
);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 200
 *         key:
 *           type: string
 *           example: SUCCESS
 *         result:
 *           $ref: '#/components/schemas/UserModel'
 */

/**
 * Update a user.
 *
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       description: User object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */

userRouter.put("/", celebrate(UserSchema.update), wrap(controller.updateUser));

userRouter.post("/", celebrate(UserSchema.add), wrap(controller.createUser));

userRouter.post(
  "/login",
  celebrate(UserSchema.login),
  wrap(controller.loginUser)
);

userRouter.delete("/", celebrate(UserSchema.byId), wrap(controller.deleteUser));

userRouter.get("/roles", wrap(controller.getRoles));

export default userRouter;
