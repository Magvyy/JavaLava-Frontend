import "./css/post.css"


import type { CommentResponse, PostResponse } from "@/types/ApiResponses";
import { deletePostAPI } from "../services/deletePostAPI";
import { useState } from "react";
import { EditPost } from "./edit/EditPost";
import { ReadPost } from "./read/ReadPost";


interface PostProps {
  post: PostResponse,
  comments?: CommentResponse[],
  onDelete: (post: PostResponse) => void,
  onEdit: (post: PostResponse) => void,
  onError?: ((message: string) => void),
  onClick?: (post: PostResponse) => void
}
export function Post({ post, comments, onDelete, onEdit, onError, onClick }: PostProps) {
  const [editing, setEditing] = useState<boolean>(false);

  const editPost = () => {
    setEditing(true);
  }

  const deletePost = () => {
    deletePostAPI(post, onDelete, null);
  }

  if (editing) {
    return (
      <EditPost
        post={post}
        editPost={editPost}
        deletePost={deletePost}
        onEdit={onEdit}
        onError={onError}
      />
    )
  }

  return (
    <ReadPost
      post={post}
      editPost={editPost}
      deletePost={deletePost}
      onError={onError}
      onClick={onClick}
      comments={comments}
    />
  )
}