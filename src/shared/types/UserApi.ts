import type { Id } from "./Id"



export interface UserResponse extends Id {
  id: number
  user_name: string
}

export interface ProfileUserResponse extends UserResponse {
  friend_status : "NOT_FRIENDS" | "FRIENDS" | "PENDING" | "REQUESTED"
}