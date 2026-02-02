import type { UserType } from "@/features/users";
import "./user.css";

import user_img from "./assets/user.svg";

interface UserProps {
  user: UserType
}
export function User(props: UserProps) {
    const { user } = props;

    return (
        <div className="user-container">
            <div>
                <img src={user_img}/>
                <p>{user.user_name}</p>
            </div>
        </div>
    )
}

