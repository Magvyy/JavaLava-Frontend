import type { UserResponse } from "@/shared/types/UserApi";

import user_img from "./assets/user.svg";
interface UserAccountProps {
    user: UserResponse
}
export function UserAccount({ user }: UserAccountProps) {
    
    
    return (
        <div className="w-[20px] h-[20px]">
            <img className="w-[20px] h-[20px]" src={user_img}/>
        </div>
    )
}