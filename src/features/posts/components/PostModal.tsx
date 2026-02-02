import { User, type UserType } from "@/features/users";
import type { CommentResponse, PostResponse } from "@/types/ApiResponses";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PostHeader } from "./PostHeader";
import { AddComment } from "@/features/comments/";
import { Comment } from "@/features/comments";
import { usePostComments } from "../hooks/usePostComments";


interface PostModalProps {
  post: PostResponse
  callback: () => void,
  svgCallback: () => void,
}
export function PostModal(props: PostModalProps) {
  const { content, published, user_name, user_id, like_count, comment_count, id } = props.post;
  const [update, setUpdate] = useState<boolean>(true);
  const { comments, setComments, state } = usePostComments(id, update);
  const user: UserType = {
    id: user_id,
    user_name: user_name,
    content: content
  };

  return (
    <div id="post-modal" onClick={() => props.callback()}>
      <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
        <CardContent className="post-content">
          <PostHeader
            callback={props.svgCallback}
            userId={user_id}
            postId={id}
            onError={null}
            modal={false}
          />
          <User
            user={user}
          />
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