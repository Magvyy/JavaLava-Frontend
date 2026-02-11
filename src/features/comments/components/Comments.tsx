import type { CommentResponse } from "@/shared/types/CommentApi";
import { Comment } from "./Comment";


interface CommentsProps {
    comments: CommentResponse[]
}

export default function Comments({ comments }: CommentsProps) {
    
    return (
      <div className="flex flex-col items-center w-full gap-[10px] no-scrollbars">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    )
}