export class ApiResponse<T> {
  response?: T;
  error?: string;
  constructor(response: ApiResponse<T>) {
    this.response = response.response;
    this.error = response.error;
  }
}
