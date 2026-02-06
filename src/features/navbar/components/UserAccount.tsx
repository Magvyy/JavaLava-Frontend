import type { UserResponse } from "@/types/ApiResponses";

import "./css/user-account.css";

import user_img from "./assets/user.svg";
interface UserAccountProps {
    user: UserResponse
}
export function UserAccount({ user }: UserAccountProps) {
    
    
    return (
        <div id="user-account">
            <img src={user_img}/>
        </div>
    )
}