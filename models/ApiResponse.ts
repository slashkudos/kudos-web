
export interface ApiResponse<T> {
  response?: T;
  error?: string;
}


export interface ApiResponseResult<T, U> {
  response?: T;
  result?: U;
  error?: string;
}
