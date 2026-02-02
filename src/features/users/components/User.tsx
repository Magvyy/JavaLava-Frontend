import type { UserResponse } from "@/types/ApiResponses";
import "./user.css";

import user_img from "./assets/user.svg";

interface UserProps {
  user: UserResponse
}
export function User({ user }: UserProps) {

    return (
        <div className="user-container">
            <div>
                <img src={user_img}/>
                <p>{user.user_name}</p>
            </div>
        </div>
    )
}

