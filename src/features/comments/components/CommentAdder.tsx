import type { CommentRequest, CommentResponse } from "@/types/ApiResponses";
import { useState } from "react";
import { getCurrentTime } from "../services/getCurrentTime";
import { createComment } from "../services/createComment";
import { Input } from "@/components/ui/input";



interface AddCommentProps {
  post_id: number,
  addComment: (comment: CommentResponse) => void
}
export function AddComment(props: AddCommentProps) {
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<string>(getCurrentTime());

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let commentRequest: CommentRequest = {
        id: null,
        content: content,
        published: getCurrentTime(),
        post_id: props.post_id
    };
    createComment(commentRequest, props.addComment);
    setContent("");
  }
  
  return (
    <div className="comment">
      <form onSubmit={submit}>
        <Input
          placeholder="Write something..."
          onChange={e => {setContent(e.target.value);}}
        />
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  );
}