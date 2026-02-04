import { useState } from "react";


import comment from "./assets/comment.svg";
import like from "./assets/like.svg";
interface PostFooterProps {
  
}
export function PostFooter(props: PostFooterProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="post-footer-svgs">
      <img src={like} onClick={(e) => {
        
      }}/>
      <img src={comment} onClick={(e) => {

      }}/>
    </div>
  )
}