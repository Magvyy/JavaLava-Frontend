
import "./post-header.css"

import { deletePost } from "../services/deletePost";
import edit from "./assets/edit.svg";
import remove from "./assets/remove.svg";
import exit from "./assets/exit.svg";
interface PostHeaderProps {
  onDelete: (id: number) => void,
  userId: number,
  postId: number,
  onError: ((message: string) => void) | null
}
export function PostHeader({ onDelete, userId, postId, onError }: PostHeaderProps) {
  let localId = localStorage.getItem("user_id");

  return (
    <div className="post-svgs">
        {(localId != null && userId == Number.parseInt(localId)) && <img src={edit} onClick={(e) => {
          e.stopPropagation();
          window.location.href = "/post/edit/" + postId;
        }}/>}
        {(localId != null && userId == Number.parseInt(localId)) && <img src={remove} onClick={(e) => {
          e.stopPropagation();
          deletePost(postId, onDelete, onError);
          window.location.href = "/";
        }}/>}
        {<img src={exit} onClick={(e) => {
          e.stopPropagation();
          window.location.href = "/";
        }}/>}
    </div>
  )
}