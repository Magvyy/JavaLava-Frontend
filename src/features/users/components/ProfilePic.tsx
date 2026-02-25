

import type { MouseEvent } from "react";
import env from "@/env/environment.json";
import user_img from "./assets/user.svg";
import type { UserResponse } from "@/shared/types/UserApi";

interface ProfilePicProps {
  user: UserResponse
  onClick?: (event: MouseEvent<HTMLImageElement>) => void
  className?: string
}
export function ProfilePic({ user, onClick, className }: ProfilePicProps) {

    return (
        <img
            className={className ? className + " rounded-[50%]" : "w-[30px] h-[30px] rounded-[50%]"}
            src={user.attachment ? env.backend + user.attachment.url : user_img}
            onClick={(e) => onClick?.(e)}
        />
    )
}
