import { ProfilePic, User } from "@/features/users";
import { timeSinceMessage } from "../services/timeSinceMessage";
import type { MessageResponse } from "@/shared/types/MessageApi";
import { useAuth } from "@/contexts/AuthContext";



interface SideBarConversationProps {
    message: MessageResponse
}

export function SideBarConversation({ message }: SideBarConversationProps) {
    const { authUser, authState } = useAuth();
    if (!authUser) return null;

    const friendData = (authUser.id === message.from.id) ? message.to : message.from;
    const timeSince = timeSinceMessage(message.sent);
    
    return (
        <div className="flex w-full p-[10px] gap-[5px] border rounded-[10px]" onClick={() => window.location.href = "/conversation/" + friendData.id}>
            <div className="flex justify-center items-center">
                <ProfilePic onClick={(e) =>  {
                    e.stopPropagation();
                    window.location.href = "/user/" + friendData.id;
                }}/>
            </div>
            <div className="flex flex-col gap-[5px] w-full">
                <p className="flex justify-start items-center">{friendData.user_name}</p>
                <div className="flex justify-between">
                    <p className="flex items-center">{message.content}</p>
                    <p className="flex items-center text-[8px]">{timeSince}</p>
                </div>
            </div>
        </div>
    )
}