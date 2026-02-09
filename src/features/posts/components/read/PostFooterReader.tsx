import { useState, type ReactNode } from "react";
import "./css/post-footer-reader.css"

import comment from "../assets/comment.svg";
import heart from "../assets/heart.svg";
import likedIcon from "../assets/liked.svg";
import { likePostAPI } from "../../services/likePostAPI";
import { unlikePostAPI } from "../../services/unlikePostAPI";
import { CardFooter } from "@/components/ui/card";
import type { CommentResponse } from "@/types/ApiResponses";
import CommentSection from "@/features/comments/components/CommentSection";
import { AddComment } from "@/features/comments";
import Comments from "@/features/comments/components/Comments";


interface PostFooterReaderProps {
  post_id: number
  liked: boolean
  comments?: CommentResponse[]
  setComments?: (comment: CommentResponse[]) => void
  commentSectionChild?: ReactNode
  className?: string
}
export function PostFooterReader({ post_id, comments, setComments, commentSectionChild, className, ...props }: PostFooterReaderProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);

  return (
      <CardFooter className={className ? className : "w-full p-0 border-[1px] rounded-br-[10px] rounded-bl-[10px] flex flex-col"}>
        <div className="w-full flex items-center justify-around p-[5px]">
          <img
            className={(liked) ? "liked w-[25px] h-[25px]" : "w-[25px] h-[25px]"}
            src={(liked) ? likedIcon : heart}
            onClick={(e) => {
              e.stopPropagation();
              (liked) ? setLiked(false) : setLiked(true);
              if (liked) {
                unlikePostAPI(post_id, () => {});
              } else {
                likePostAPI(post_id, () => {});
              }
          }}/>
          <img
            className="w-[25px] h-[25px]"
            src={comment}
            onClick={(e) => {
            // e.stopPropagation();
          }}/>
        </div>
        {comments && setComments && (
          <>
            <hr className="w-full"/>
            {commentSectionChild}
          </>
        )}
      </CardFooter>
  )
}