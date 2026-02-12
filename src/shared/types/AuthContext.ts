import type { ApiState } from "./ApiResult";
import type { UserResponse } from "./UserApi";


export interface AuthContextType {
  authUser: UserResponse | undefined
  authState: ApiState<UserResponse>
}