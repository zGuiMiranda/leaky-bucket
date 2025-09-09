import { BusinessErrorType } from "./error";

export class BusinessError extends Error {
  constructor(message: BusinessErrorType) {
    super(message);
    this.name = "BusinessError";
    this.message = message;
  }
}
