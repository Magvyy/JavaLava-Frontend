

export type ApiResult<T> =
  | { data: T; error: undefined }
  | { data: undefined; error: string }

export type ApiState<T> =
  | {called: false; loading: false; result: undefined}
  | {called: true; loading: true; result: undefined}
  | {called: true; loading: false; result: ApiResult<T>}