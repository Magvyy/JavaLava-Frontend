import { Card, CardContent, CardFooter } from "@/components/ui/card";
import "./post.css"


import type { PostResponse } from "@/types/ApiResponses";
import { User } from "@/features/users";
import { PostFooter } from "./PostFooter";
interface PostProps {
  post: PostResponse,
  onEdit: (post: PostResponse) => void,
  onDelete: (post: PostResponse) => void,
  onError: ((message: string) => void) | null,
  onClick: (post: PostResponse) => void
}
export function Post({ post, onEdit, onDelete, onError, onClick }: PostProps) {

  return (
    <Card className="mx-auto w-full max-w-sm post" onClick={() => onClick(post)}>
      <CardContent className="post-content">
        <User
          user={post.user}
        />
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="w-full">
        <PostFooter
          post_id={post.id}
          liked={post.liked}
        />
      </CardFooter>
    </Card>
  )
}