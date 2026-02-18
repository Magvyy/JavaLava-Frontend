import type { CommentResponse } from "@/shared/types/CommentApi";
import { Comment } from "./Comment";
import type { RefObject } from "react";


interface CommentsProps {
    comments: CommentResponse[]
    ref: RefObject<HTMLDivElement | null>
}

export default function Comments({ comments, ref }: CommentsProps) {
    
    return (
      <div className="flex flex-col items-center w-full gap-[10px] max-h-[400px] overflow-auto scrollbar-hide" ref={ref}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    )
}