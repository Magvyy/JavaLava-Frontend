import type { UserResponse } from "./UserApi"

export interface MessageResponse {
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