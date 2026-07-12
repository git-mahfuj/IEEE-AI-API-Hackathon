export class ApiResponse<T = any> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T | null;

  constructor(
    statusCode: number,
    data: T | null = null,
    message: string = "Success",
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = this.statusCode >= 200 && this.statusCode < 400;
    this.data = data;
  }
}
