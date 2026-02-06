import { useState } from "react";
import "./css/post-footer-reader.css"


import comment from "../assets/comment.svg";
import heart from "../assets/heart.svg";
import likedIcon from "../assets/liked.svg";
import { likePostAPI } from "../../services/likePostAPI";
import { unlikePostAPI } from "../../services/unlikePostAPI";
import { CardFooter } from "@/components/ui/card";
import type { CommentResponse } from "@/types/ApiResponses";
import CommentSection from "@/features/comments/components/CommentSection";


interface PostFooterReaderProps {
  className?: string,
  post_id: number,
  liked: boolean,
  comments?: CommentResponse[]
}
export function PostFooterReader(props: PostFooterReaderProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);

  return (
      <CardFooter className={(props.className) ? "post-footer " + props.className : "post-footer"}>
        <div className="post-footer-svgs">
          <img src={(liked) ? likedIcon : heart} className={(liked) ? "liked" : ""} onClick={(e) => {
            e.stopPropagation();
            (liked) ? setLiked(false) : setLiked(true);
            if (liked) {
              unlikePostAPI(props.post_id, () => {});
            } else {
              likePostAPI(props.post_id, () => {});
            }


          }}/>
          <img src={comment} onClick={(e) => {
            // e.stopPropagation();
          }}/>
        </div>
        {props.comments && (
          <>
            <hr className="w-full"/>
            <CommentSection
              post_id={props.post_id}
              comments={props.comments}
              addComment={() => () => {}}
            />
          </>
        )}
      </CardFooter>
  )
}