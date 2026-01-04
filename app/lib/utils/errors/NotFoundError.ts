import APIError from "./APIError";

/** A 404 Not Found Error */
export default class NotFoundError extends APIError {
  constructor(public message: string) {
    super(404, message);
  }
}
