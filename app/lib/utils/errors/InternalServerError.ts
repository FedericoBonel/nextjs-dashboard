import APIError from "./APIError";

/** A 500 Internal Server Error */
export default class InternalServerError extends APIError {
  constructor(public message: string) {
    super(500, message);
  }
}
