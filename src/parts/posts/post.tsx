import { use, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// POSTS
import type { CommentResponse, PostResponse, UserI } from "@/types/ApiResponses";
import { formatDateStringToDDMonthYear } from "./functions";
import user from "../../assets/user.svg";
interface PostProps {
  data: PostResponse
}
export function Post(props: PostProps) {
  const { content, published, user_name, like_count, comment_count, id } = props.data;
  const [modal, setModal] = useState<boolean>(false);
  const user: UserI = {
    id: id,
    user_name: user_name,
    content: content
  };

  if (modal) {
    return (
      <PostModal
        data={props.data}
        callback={() => {
          setModal(false);
        }}
      />
    )
  }

  return (
    <Card className="mx-auto w-full max-w-sm post" onClick={() => setModal(true)}>
      <CardContent >
        <User
          user={user}
        />
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}


// POST MODALS
import { usePostComments } from "./functions";
import { Comment, AddComment } from '@/parts/comments/comment';
import { User } from "../users/user";
interface PostModalProps {
  data: PostResponse
  callback: () => void
}
function PostModal(props: PostModalProps) {
  const { content, published, user_name, like_count, comment_count, id } = props.data;
  const [update, setUpdate] = useState<boolean>(true);
  const { comments, setComments, state } = usePostComments(id, update);
  const user: UserI = {
    id: id,
    user_name: user_name,
    content: content
  };

  return (
    <div id="post-modal" onClick={() => props.callback()}>
      <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
        <CardContent id="post-modal-header-section">
          <User
            user={user}
          />
        </CardContent>
        <CardFooter id="post-modal-comment-section">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
            />
          ))}
          <AddComment
            post_id={id}
            addComment={(comment: CommentResponse) => {
              setComments([...comments, comment]);
            }}
          />
        </CardFooter>
      </Card>
    </div>
  )
}