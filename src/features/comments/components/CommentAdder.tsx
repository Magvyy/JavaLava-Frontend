import type { CommentRequest, CommentResponse } from "@/shared/types/CommentApi";

import { useEffect, useState } from "react";
import { getCurrentTime } from "../services/getCurrentTime";
import { createComment } from "../services/createComment";
import { Input } from "@/components/ui/input";



interface AddCommentProps {
  post_id: number,
  addComment: (comment: CommentResponse) => void
}
export function AddComment({ post_id, addComment }: AddCommentProps) {
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<string>(getCurrentTime());

  useEffect(() => {
    
  }, [content]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let commentRequest: CommentRequest = {
        id: null,
        content: content,
        published: getCurrentTime(),
        post_id: post_id
    };
    createComment(commentRequest, addComment);
    setContent("");
  }
  
  return (
    <div className="w-full p-[5px]">
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