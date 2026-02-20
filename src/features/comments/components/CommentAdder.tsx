import type { CommentResponse } from "@/shared/types/CommentApi";
import { Input } from "@/components/ui/input";
import { useAddComment } from "../hooks/useAddComment";



interface AddCommentProps {
  postId: number,
  addComment: (comment: CommentResponse) => void
}
export function AddComment({ postId, addComment }: AddCommentProps) {
  const { content, setContent, submitComment } = useAddComment();
  
  return (
    <div className="w-full p-[5px]">
      <form onSubmit={(e) => {
        e.preventDefault();
        submitComment(postId, addComment);
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