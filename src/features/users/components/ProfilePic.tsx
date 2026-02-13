

import type { MouseEvent } from "react";
import user_img from "./assets/user.svg";

interface ProfilePicProps {
  onClick?: (event: MouseEvent<HTMLImageElement>) => void
  className?: string
}
export function ProfilePic({ onClick, className }: ProfilePicProps) {

    return (
        <img
            className={className ? className : "w-[30px] h-[30px] rounded-[50%]"}
            src={user_img}
            onClick={(e) => onClick?.(e)}
        />
    )
}
