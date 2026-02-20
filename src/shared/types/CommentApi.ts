import type { Id } from "./Id"
import type { UserResponse } from "./UserApi"

export interface CommentResponse extends Id {
  id: number
  user: UserResponse
  content: string
  published: string
  post_id: number
}

export interface CommentRequest {
  id: number | null
  content: string
  post_id: number
}