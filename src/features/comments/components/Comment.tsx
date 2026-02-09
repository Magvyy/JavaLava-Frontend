import { User } from "@/features/users";


import type { CommentResponse } from "@/types/ApiResponses";
interface CommentProps {
  comment: CommentResponse
}
export function Comment({ comment }: CommentProps) {
  const { id, user, content, published, post_id } = comment;
  
  return (
    <div className="w-full flex flex-col items-start gap-[5px]">
      <User
        user={user}
      />
      <p className="comment-content">{content}</p>
    </div>
  );
}