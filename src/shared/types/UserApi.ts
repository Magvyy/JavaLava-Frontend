import type { AttachmentResponse } from "./AttachmentApi"
import type { Id } from "./Id"



export interface UserResponse extends Id {
  user_name: string
  attachment: AttachmentResponse
}

export interface UserRequest extends Id {
  user_name: string
  // password: string
}

export interface ProfileUserResponse extends UserResponse {
  friend_status : "NOT_FRIENDS" | "FRIENDS" | "PENDING" | "REQUESTED"
}