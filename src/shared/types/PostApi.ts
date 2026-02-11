import type { UserResponse } from "./ApiResponses"


export interface PostResponse {
  id: number
  user: UserResponse
  liked: boolean
  content: string
  published: string
  visible: boolean
  like_count: number
  comment_count: number
}

export interface PostRequest {
  id: number | null
  content: string
  published: string
  visible: boolean
}