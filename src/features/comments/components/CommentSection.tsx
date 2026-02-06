import type { CommentResponse } from "@/types/ApiResponses";
import { AddComment } from "./CommentAdder";
import { Comment } from "./Comment";
import "./css/comment-section.css"


interface CommentSectionProps {
    post_id: number,
    comments: CommentResponse[],
    addComment: (comment: CommentResponse) => void,
}

export default function CommentSection({ post_id, comments, addComment }: CommentSectionProps) {
    
    return (
      <div className="comment-section">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))}
        <AddComment
          post_id={post_id}
          addComment={addComment}
        />
      </div>
    )
}