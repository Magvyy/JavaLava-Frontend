import "./comment.css"


import type { CommentRequest, CommentResponse } from "@/types/ApiResponses";
interface CommentProps {
  comment: CommentResponse
}
export function Comment(props: CommentProps) {
  const { id, content, published, user_id, user_name, post_id } = props.comment;
  const user: UserType = {
    id: user_id,
    user_name: user_name,
    content: content
  };
  
  return (
    <div className="comment">
      <User
        user={user}
      />
    </div>
  );
}