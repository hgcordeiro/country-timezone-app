import { ApiError } from "../types/ApiError";

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(error: ApiError) {
    this.message = error.message;
    this.statusCode = error.statusCode;
  }
}

export default AppError;
