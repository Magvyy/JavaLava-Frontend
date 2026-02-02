import "./post.css"


import type { PostResponse } from "@/types/ApiResponses";
import { ReadPost } from "./ReadPost";
import { EditPost } from "./EditPost";
import { CreatePost } from "./CreatePost";
interface PostProps {
  post: PostResponse | null,
  onCreate: (post: PostResponse) => void,
  onEdit: (post: PostResponse) => void,
  onDelete: (post: PostResponse) => void,
  onError: ((message: string) => void) | null
}
export function Post(props: PostProps) {
  const onError = () => {

  }

  if (props.post != null) {
    return (
      <ReadPost
        post={props.post}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        onError={onError}
      />
    )
  }

  return (
    <CreatePost
        onCreate={props.onCreate}
        onError={props.onError}
    />
  )
}