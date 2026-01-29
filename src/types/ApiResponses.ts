
export interface State {
  loading: boolean,
  error: string | null
}

export interface PostResponse {
  id: number,
  user_name: string,
  user_id: number,
  content: string,
  published: string,
  visible: boolean,
  like_count: number,
  comment_count: number
}

export interface PostRequest {
  id: number | null,
  visible: boolean,
  like_count: number,
  comment_count: number
}

export interface CommentResponse {
  id: number,
  content: string,
  published: string,
  user_id: number,
  user_name: string,
  post_id: number,
}

export interface CommentRequest {
  id: number | null,
  content: string,
  published: string,
  post_id: number
}

export interface UserI {
  id: number,
  user_name: string,
  content: string
}

