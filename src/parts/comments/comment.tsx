import "./comment.css"

// COMMENT
import type { CommentRequest, CommentResponse, UserI } from "@/types/ApiResponses";
import { User } from "../users/user";
interface CommentProps {
  comment: CommentResponse
}
export function Comment(props: CommentProps) {
  const { id, content, published, user_id, user_name, post_id } = props.comment;
  const user: UserI = {
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


// COMMENT ADDER
import { createComment, getCurrentTime } from "./functions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
interface AddCommentProps {
  post_id: number,
  addComment: (comment: CommentResponse) => void
}
export function AddComment(props: AddCommentProps) {
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<string>(getCurrentTime());
  
  return (
    <div className="comment">
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let commentRequest: CommentRequest = {
          id: null,
          content: content,
          published: getCurrentTime(),
          post_id: props.post_id
        };
        createComment(commentRequest, props.addComment);
        setContent("");
      }}>
        <Input
          placeholder="Write something..."
          onChange={e => {setContent(e.target.value);}}
        />
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  );
}