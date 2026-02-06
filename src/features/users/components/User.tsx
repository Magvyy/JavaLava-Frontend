import type { UserResponse } from "@/types/ApiResponses";
import "./user.css";

import user_img from "./assets/user.svg";

interface UserProps {
  user: UserResponse,
  idName?: string,
}
export function User({ user, idName }: UserProps) {

    const onClick = () => {
        window.location.href = "/user/" + user.id;
    }

    return (
        <div 
            {...(idName && { id: idName })}
            className="user-container"
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
        >
            <div>
                <img src={user_img}/>
                <p>{user.user_name}</p>
            </div>
        </div>
    )
}

