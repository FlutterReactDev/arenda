export interface BaseResponse<T> {
  isOk: boolean;
  message: string;
  result: T;
}
