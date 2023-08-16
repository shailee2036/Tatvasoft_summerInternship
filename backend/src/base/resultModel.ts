import { ErrorCode, HttpStatusCode } from "../utility/enum";

export class Result<T> {
  public code: HttpStatusCode;

  public key: ErrorCode;

  public error?: string;

  public result?: T;

  constructor(newResult: Result<T>) {
    this.code = newResult.code;
    this.key = newResult.key;
    this.error = newResult.error;
    this.result = newResult.result;
  }
}
