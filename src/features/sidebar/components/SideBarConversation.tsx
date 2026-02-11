import { ProfilePic, User } from "@/features/users";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import type { MessageResponse } from "@/types/ApiResponses";
import { timeSinceMessage } from "../services/timeSinceMessage";



interface SideBarConversationProps {
    message: MessageResponse
}

export function SideBarConversation({ message }: SideBarConversationProps) {
    const { user } = useAuthenticateMe();

    if (user === undefined) return null;
    const friendData = (user.id === message.from.id) ? message.to : message.from;

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