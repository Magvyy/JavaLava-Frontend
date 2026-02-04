import { User } from "@/features/users";
import type { CommentResponse, PostResponse } from "@/types/ApiResponses";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PostHeader } from "./PostHeader";
import { AddComment } from "@/features/comments/";
import { Comment } from "@/features/comments";
import { usePostComments } from "../hooks/usePostComments";


interface PostModalProps {
  post: PostResponse
  onClick: () => void,
  onDelete: (id: number) => void,
}
export function PostModal({ post, onClick, onDelete }: PostModalProps) {
  const { id, user, content, published, like_count, comment_count } = post;
  const [update, setUpdate] = useState<boolean>(true);
  const { comments, setComments, state } = usePostComments(id, update);

  return (
    <div id="post-modal" onClick={() => onClick()}>
      <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
        <CardContent className="post-content">
          <PostHeader
            onDelete={onDelete}
            userId={user.id}
            postId={id}
            onError={null}
          />
          <User
            user={user}
          />
          <p>{content}</p>
        </CardContent>
        <CardFooter className="post-modal-comment-section">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
            />
          ))}
          <AddComment
            post_id={id}
            addComment={(comment: CommentResponse) => {
              setComments([...comments, comment]);
            }}
          />
        </CardFooter>
      </Card>
    </div>
  )
}