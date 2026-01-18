import { InvalidResult } from "@/apis/validators/create-validation-result";
import APIError from "./APIError";

/** A 400 Internal Server Error */
export default class BadRequestError<T> extends APIError {
  constructor(public message: string, public errors?: InvalidResult<T>) {
    super(400, message);
  }
}
