import APIError from "./APIError";

/** An unauthorized error */
export default class UnauthorizedError extends APIError {
  constructor(public message: string = "The provided credentials are invalid") {
    super(401, message);
  }
}
