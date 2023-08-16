import { ErrorCode, HttpStatusCode } from "../utility/enum";
import { Response } from "express";
import { ErrorResult } from "./errorResult";
import { Result } from "./resultModel";

class BaseController {
  private headers: object = {
    "Access-Control-Allow-Origin": "*", // This is required to make CORS work with AWS API Gateway Proxy Integration.
    Server: "FooServer",
    "Strict-Transport-Security": "max-age=31536000",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "x-frame-options": "SAMEORIGIN",
  };

  public sendResult<T>(res: Response, result: Result<T>): Response {
    res.set(this.headers);
    return res.status(result.code).json(result);
  }

  public sendErrorResult(res: Response): Response {
    const result: ErrorResult = new ErrorResult(ErrorCode.InternalServerError);
    res.set(this.headers);
    return res.status(HttpStatusCode.InternalServerError).json(result);
  }
}

export const baseController = new BaseController();
