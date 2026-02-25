import { ProfilePic } from "@/features/users";
import { Loader } from "@/shared/components/Loader";
import { useUser } from "@/shared/hooks/useUser";


interface ConversationUserProps {
    userId: number
    className?: string
}
export function ConversationUser({ userId, className }: ConversationUserProps) {
    const { state: friendState } = useUser(userId);
    
    return (
        <div className={className ? className : "flex"}>
            <Loader state={friendState}>
                {(user) => 
                    <>
                        <ProfilePic
                            user={user}
                        />
                        <p>{user.user_name}</p>
                    </>
                }
            </Loader>
        </div>
    )
}