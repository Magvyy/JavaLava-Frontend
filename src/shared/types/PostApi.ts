import type { AttachmentResponse } from "./AttachmentApi"
import type { Id } from "./Id"
import type { UserResponse } from "./UserApi"

export interface PostResponse extends Id {
  id: number
  user: UserResponse
  liked: boolean
  content: string
  published: string
  visible: boolean
  like_count: number
  comment_count: number
  attachment?: AttachmentResponse
}

export interface PostRequest {
  id: number | null
  content: string
  visible: boolean
}