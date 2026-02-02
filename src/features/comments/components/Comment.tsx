import { User } from "@/features/users";
import "./comment.css"


import type { CommentResponse } from "@/types/ApiResponses";
interface CommentProps {
  comment: CommentResponse
}
export function Comment(props: CommentProps) {
  const { id, user, content, published, post_id } = props.comment;
  
  return (
    <div className="comment">
      <User
        user={user}
      />
      <p className="comment-content">{content}</p>
    </div>
  );
}