import { Card} from "@/components/ui/card";
import "./css/read-post.css"

import type { CommentResponse, PostResponse } from "@/types/ApiResponses";
import { PostHeader } from "../PostHeader";
import { PostContentReader } from "./PostContentReader";
import { PostFooterReader } from "./PostFooterReader";
interface ReadPostProps {
  post: PostResponse,
  comments?: CommentResponse[],
  editPost: () => void,
  deletePost: () => void,
  onError?: ((message: string) => void) | null,
  onClick?: (post: PostResponse) => void
}
export function ReadPost({ post, comments, editPost, deletePost, onError, onClick }: ReadPostProps) {

  return (
    <Card className="mx-auto w-full max-w-sm post" onClick={() => (onClick ? onClick(post) : {})}>
      <PostHeader
        editPost={editPost}
        deletePost={deletePost}
        user={post.user}
        onError={onError}
      />
      <PostContentReader
        post={post}
      />
      <PostFooterReader
        post_id={post.id}
        liked={post.liked}
        comments={comments}
      />
    </Card>
  )
}