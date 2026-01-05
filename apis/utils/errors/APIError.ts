/** An error that should be used for API responses */
export default class APIError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}
