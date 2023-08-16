import { Request, Response } from "express";
import { UserService } from "./user.service";
import { baseController } from "../base/controller";
import { UserModel } from "./user.model";
import { Result } from "../base/resultModel";
import { ErrorCode, HttpStatusCode } from "../utility/enum";
import { roles } from "../utility/constants";

export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    return this.userService
      .loginUser(email, password)
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public getUsers = async (req: Request, res: Response): Promise<Response> => {
    const { pageIndex, pageSize, keyword } = req.query;
    return this.userService
      .getUsers(
        Number(pageSize),
        Number(pageIndex),
        keyword ? String(keyword) : ""
      )
      .then((result) => baseController.sendResult(res, result))
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public getUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.query;

    return this.userService
      .getbyId(Number(id))
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return this.userService
      .getAllUsers()
      .then((result) => baseController.sendResult(res, result))
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public updateUser = async (
    req: Request<{}, {}, UserModel>,
    res: Response
  ): Promise<Response> => {
    const user = req.body;
    return this.userService
      .updateUser(user)
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public createUser = async (
    req: Request<{}, {}, UserModel>,
    res: Response
  ): Promise<Response> => {
    const user = req.body;
    return this.userService
      .createUser({ ...user })
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.query;

    return this.userService
      .deleteUser(Number(id))
      .then((result) => {
        return baseController.sendResult(res, result);
      })
      .catch((e: Error) => {
        return baseController.sendErrorResult(res);
      });
  };

  public getRoles = (req: Request, res: Response) => {
    const result = new Result({
      code: HttpStatusCode.Ok,
      key: ErrorCode.Ok,
      result: roles,
    });
    return baseController.sendResult(res, result);
  };
}
