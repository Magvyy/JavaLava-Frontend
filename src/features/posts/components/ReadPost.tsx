import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User, type UserType } from "@/features/users";
import type { PostResponse } from "@/types/ApiResponses";
import { PostFooter } from "./PostFooter";


interface ReadPostProps {
  post: PostResponse,
  onDelete: (post: PostResponse) => void,
  onEdit: (post: PostResponse) => void,
  onError: ((message: string) => void) | null
}
export function ReadPost(props: ReadPostProps) {
  const { content, user_name, user_id } = props.post;
  const user: UserType = {
    id: user_id,
    user_name: user_name,
    content: content
  };
  
  return (
    <Card className="mx-auto w-full max-w-sm post">
      <CardContent className="post-content">
        <User
          user={user}
        />
      </CardContent>
      <CardFooter className="post-footer">
        <PostFooter/>
      </CardFooter>
    </Card>
  )
}
