import type { UserResponse } from "@/types/ApiResponses";

import type { ReactNode } from "react";

interface UserProps {
    user: UserResponse
    onClick?: () => void
    profilePicChild?: ReactNode
    className?: string
}
export function User({ user, onClick, profilePicChild, className }: UserProps) {

    return (
        <div onClick={(event) => {
            event.stopPropagation();
            onClick?.();
        }}>
            <div className={className ? className : "p-0 pt-[10px] m-0 h-full flex flex-row items-center gap-[5px]"}>
                {profilePicChild}
                <p>{user.user_name}</p>
            </div>
        </div>
    )
}

