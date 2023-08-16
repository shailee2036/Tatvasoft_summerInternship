export enum HttpStatusCode {
  BadRequest = 400,
  ConflictError = 409,
  Forbidden = 403,
  InternalServerError = 500,
  MethodNotAllowed = 405,
  NotFound = 404,
  Ok = 200,
  ServiceUnavailable = 503,
  Unauthorized = 401,
}

export enum ErrorCode {
  BadRequest = "BAD_REQUEST",
  Conflict = "CONFLICT",
  Created = "CREATED",
  Updated = "UPDATED",
  Forbidden = "FORBIDDEN",
  InternalServerError = "INTERNAL_SERVER",
  MethodNotAllowed = "METHOD_NOT_ALLOWED",
  NotFound = "NOT_FOUND",
  DataDuplication = "DATA_DUPLICATION",
  Deleted = "DELETED",
  Disabled = "DISABLED",
  Ok = "SUCCESS",
  ServiceUnavailable = "SERVICE_UNAVALABLE",
  Unauthorized = "UNAUTHORIZED",
  UserNotFound = "USER_NOT_FOUND",
}
