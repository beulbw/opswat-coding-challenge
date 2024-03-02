export class CustomError extends Error {
  declare statusCode?: number;

  constructor(statusCode: number, message: string, name?: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name ?? this.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, message, "BadRequestException");
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(401, message, "AuthenticationException");
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(404, message, "NotFoundException");
  }
}

export class CommonError extends CustomError {
  constructor(message?: string) {
    super(500, message ?? "An error has occured", "Exception");
  }
}
