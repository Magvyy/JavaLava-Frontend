import type { UserResponse } from "@/shared/types/UserApi";

import { ProfilePic } from "@/features/users";
interface UserAccountProps {
    user: UserResponse
}
export function UserAccount({ user }: UserAccountProps) {
    
    
    return (
        <div className="w-[40px] h-[40px]">
            <ProfilePic
                className="w-[40px] h-[40px]"
                user={user}
            />
        </div>
    )
}