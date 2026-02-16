import type { Id } from "./Id"
import type { UserResponse } from "./UserApi"

export interface MessageResponse extends Id {
  id: number
  from: UserResponse
  to: UserResponse
  content: string
  sent: string
}

export interface MessageRequest {
  id: number | null
  to_user_id: number
  content: string
  sent: string
}