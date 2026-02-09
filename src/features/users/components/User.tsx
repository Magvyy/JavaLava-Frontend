import type { UserResponse } from "@/types/ApiResponses";

import user_img from "./assets/user.svg";

interface UserProps {
  user: UserResponse
  className?: string
}
export function User({ user, className }: UserProps) {

    const onClick = () => {
        window.location.href = "/user/" + user.id;
    }

    return (
        <div onClick={(event) => {
            event.stopPropagation();
            onClick();
        }}>
            <div className={className ? className : "p-0 pt-[10px] m-0 h-full flex flex-row items-center gap-[5px]"}>
                <img className="h-[30px] rounded-[50%]" src={user_img}/>
                <p>{user.user_name}</p>
            </div>
        </div>
    )
}

