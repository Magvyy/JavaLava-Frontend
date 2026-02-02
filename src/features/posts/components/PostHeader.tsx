

import { deletePost } from "../services/deletePost";
import edit from "./assets/edit.svg";
import remove from "./assets/remove.svg";
import exit from "./assets/exit.svg";
interface PostHeaderProps {
  callback: () => void,
  userId: number,
  postId: number,
  onError: ((message: string) => void) | null,
  modal: boolean
}
export function PostHeader(props: PostHeaderProps) {
  let userId = props.userId;
  let postId = props.postId;
  let localId = localStorage.getItem("user_id");

  return (
    <div className="post-svgs">
        {(localId != null && userId == Number.parseInt(localId)) && <img src={edit} onClick={(e) => {
          e.stopPropagation();
          window.location.href = "/post/edit/" + postId;
        }}/>}
        {(localId != null && userId == Number.parseInt(localId)) && <img src={remove} onClick={(e) => {
          e.stopPropagation();
          deletePost(postId, props.callback, props.onError);
        }}/>}
        {(props.modal == true) && <img src={exit} onClick={(e) => {
          e.stopPropagation();
          window.location.href = "/";
        }}/>}
    </div>
  )
}