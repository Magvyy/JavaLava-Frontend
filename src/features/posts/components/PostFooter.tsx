import { useEffect, useState } from "react";
import "./post-footer.css"


import comment from "./assets/comment.svg";
import heart from "./assets/heart.svg";
import likedIcon from "./assets/liked.svg";
import { likePost } from "../services/likePost";
import { unlikePost } from "../services/unlikePost";
interface PostFooterProps {
  post_id: number,
  liked: boolean
}
export function PostFooter(props: PostFooterProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);

  return (
    <div className="post-footer">
      <img src={(liked) ? likedIcon : heart} className={(liked) ? "liked" : ""} onClick={(e) => {
        e.stopPropagation();
        (liked) ? setLiked(false) : setLiked(true);
        if (liked) {
          unlikePost(props.post_id, () => {});
        } else {
          likePost(props.post_id, () => {});
        }


      }}/>
      <img src={comment} onClick={(e) => {
        // e.stopPropagation();
      }}/>
    </div>
  )
}