import type { CommentResponse } from "@/shared/types/CommentApi";
import { Input } from "@/components/ui/input";
import { useAddComment } from "../hooks/useAddComment";



interface AddCommentProps {
  post_id: number,
  addComment: (comment: CommentResponse) => void
}
export function AddComment({ post_id, addComment }: AddCommentProps) {
  const { content, setContent, submitComment } = useAddComment();
  
  return (
    <div className="w-full p-[5px]">
      <form onSubmit={(e) => {
        e.preventDefault();
        submitComment(post_id, addComment);
      }}>
        <Input
          placeholder="Comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  );
}