import type { UserResponse } from "./UserApi"

export interface CommentResponse {
  id: number
  user: UserResponse
  content: string
  published: string
  post_id: number
}

export interface CommentRequest {
  id: number | null
  content: string
  published: string
  post_id: number
}