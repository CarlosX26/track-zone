class AppError {
  message: string | string[];
  statusCode: number;

  constructor(message: string | string[], statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
