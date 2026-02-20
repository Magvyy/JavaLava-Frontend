import { useState, type ReactNode } from "react";
import "./css/post-footer-reader.css"

import comment from "../assets/comment.svg";
import heart from "../assets/heart.svg";
import likedIcon from "../assets/liked.svg";
import { likePostAPI } from "../../services/likePostAPI";
import { unlikePostAPI } from "../../services/unlikePostAPI";
import { CardFooter } from "@/components/ui/card";
import type { CommentResponse } from "@/shared/types/CommentApi";


interface PostFooterReaderProps {
  postId: number
  liked: boolean
  likeCount?: number
  commentCount?: number
  comments?: CommentResponse[]
  setComments?: (comment: CommentResponse[]) => void
  commentSectionChild?: ReactNode
  className?: string
}
export function PostFooterReader({ postId, likeCount, commentCount, comments, setComments, commentSectionChild, className, ...props }: PostFooterReaderProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);

  return (
      <CardFooter className={className ? className : "w-full p-0 border-[1px] rounded-br-[10px] rounded-bl-[10px] flex flex-col"}>
        <div className="w-full flex items-center justify-around p-[5px]">
          <div className="flex flex-row items-center gap-[8px]">
            <img
              className={(liked) ? "liked w-[25px] h-[25px]" : "w-[25px] h-[25px]"}
              src={(liked) ? likedIcon : heart}
              onClick={(e) => {
                e.stopPropagation();
                (liked) ? setLiked(false) : setLiked(true);
                if (liked) {
                  unlikePostAPI(postId, () => {});
                } else {
                  likePostAPI(postId, () => {});
                }
            }}/>
            {likeCount && <p className="text-center text-[14px]">{likeCount}</p>}
          </div>
          <div className="flex flex-row items-center gap-[8px]">
            <img
              className="w-[25px] h-[25px]"
              src={comment}
              onClick={(e) => {
              // e.stopPropagation();
            }}/>
            {commentCount && <p className="text-center text-[14px]">{commentCount}</p>}
          </div>
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