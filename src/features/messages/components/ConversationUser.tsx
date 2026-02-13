import { ProfilePic } from "@/features/users";
import type { UserResponse } from "@/shared/types/UserApi";


interface ConversationUserProps {
    user: UserResponse
    className?: string
}
export function ConversationUser({ user, className }: ConversationUserProps) {
    
    return (
        <div className={className ? className : "flex"}>
            <ProfilePic/>
            <p>{user.user_name}</p>
        </div>
    )
}