import type { UserI } from "@/types/ApiResponses";
import "./user.css";

import user_img from "../../assets/user.svg";
interface UserProps {
  user: UserI
}
export function User(props: UserProps) {
    const { user } = props;

    return (
        <div className="user-container">
            <div className="user-profile-picture">
                <img src={user_img}/>
            </div>
            <div className="user-content">
                <p>{user.user_name}</p>
                <p>{user.content}</p>
            </div>
        </div>
    )
}