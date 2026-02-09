
export interface State {
  loading: boolean,
  error: string | null
}

export interface UserResponse {
  id: number,
  user_name: string
}

export interface ProfileUserResponse extends UserResponse {
  friend_status : "NOT_FRIENDS" | "FRIENDS" | "PENDING" | "REQUESTED"
}

export interface PostResponse {
  id: number,
  user: UserResponse,
  liked: boolean,
  content: string,
  published: string,
  visible: boolean,
  like_count: number,
  comment_count: number
}

export interface PostRequest {
  id: number | null,
  content: string,
  published: string,
  visible: boolean
}

export interface CommentResponse {
  id: number,
  user: UserResponse,
  content: string,
  published: string,
  post_id: number,
}

export interface CommentRequest {
  id: number | null,
  content: string,
  published: string,
  post_id: number
}

