

// COMMENT
import type { CommentRequest, CommentResponse } from "@/types/ApiResponses";
import user from "../../assets/user.svg";
interface CommentProps {
  comment: CommentResponse
}
export function Comment(props: CommentProps) {
  const { comment } = props;
  
  return (
    <div className="comment">
      <img src={user}/>
      <div className="content-container">
        <p className="user-name">{comment.user_name}</p>
        <p className="content">{comment.content}</p>
      </div>
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