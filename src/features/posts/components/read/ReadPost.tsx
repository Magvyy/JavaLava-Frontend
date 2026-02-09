import { Card} from "@/components/ui/card";

import type { CommentResponse, PostResponse } from "@/types/ApiResponses";
import { PostHeader } from "../PostHeader";
import { PostContentReader } from "./PostContentReader";
import { PostFooterReader } from "./PostFooterReader";
import { useState } from "react";
interface ReadPostProps {
  post: PostResponse,
  comments?: CommentResponse[],
  editPost: () => void,
  deletePost: () => void,
  onError?: ((message: string) => void) | null,
  onClick?: (post: PostResponse) => void,
  className?: string,
  headerClassName?: string,
  contentClassName?: string,
  footerClassName?: string
}
export function ReadPost({ post, comments, editPost, deletePost, onError, onClick, className, headerClassName, contentClassName, footerClassName }: ReadPostProps) {
  const [liked, setLiked] = useState<boolean>(post.liked);

  return (
    <Card className={className ? className : "mx-auto w-full max-w-sm p-0"} onClick={() => (onClick ? onClick(post) : {})}>
      <PostHeader
        editPost={editPost}
        deletePost={deletePost}
        user={post.user}
        onError={onError}
        className={headerClassName}
      />
      <PostContentReader
        post={post}
        className={contentClassName}
      />
      <PostFooterReader
        post_id={post.id}
        liked={liked}
        setLiked={setLiked}
        comments={comments}
        className={footerClassName}
      />
    </Card>
  )
}