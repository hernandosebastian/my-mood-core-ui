import { IApiResponseError } from "../interfaces/api-response-error.interface";

export class ApiResponseError extends Error implements IApiResponseError {
  error: string;
  message: string;
  statusCode: number;
  constructor(error: string, message: string, statusCode: number) {
    super(message);
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
}
