


export interface UserResponse {
  id: number
  user_name: string
}

export interface ProfileUserResponse extends UserResponse {
  friend_status : "NOT_FRIENDS" | "FRIENDS" | "PENDING" | "REQUESTED"
}