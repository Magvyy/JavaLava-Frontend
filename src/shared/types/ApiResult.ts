export type Error = {
  error: string,
  message: string
}

export type ApiResult<T> =
  | { data: T; error: undefined }
  | { data: undefined; error: Error }

export type ApiState<T> =
  | {called: false; loading: false; result: undefined}
  | {called: true; loading: true; result: undefined}
  | {called: true; loading: false; result: ApiResult<T>}