import { useAuth } from "@/contexts/AuthContext";
import { ProfilePic, User } from "@/features/users";
import type { MessageResponse } from "@/shared/types/MessageApi";



interface MessageProps {
    message: MessageResponse
    className?: string
}

export function Message({ message, className }: MessageProps) {
    const { authUser, authState } = useAuth();
    if (!authUser) return null;

    const isSender = authUser.id === message.from.id
    const color = (isSender) ? " bg-blue-100" : " bg-gray-100"
    const alignment = (isSender) ? " justify-end" : " justify-start"

    const content = isSender
        ? <p className={"p-1 border-1 rounded-[10px]" + color}>{message.content}</p>
        :
        <>
            <ProfilePic/>
            <div className="flex flex-col gap-[5px]">
                <p className="text-[12px]">{message.from.user_name}</p>
                <p className={"p-1 border-1 rounded-[10px]" + color}>{message.content}</p>
            </div>
        </>
    
    return (
        <div className={className ? className : "flex w-full" + alignment}>
            <div className={"flex gap-[5px] items-center"}>
                {content}
            </div>
        </div>
    )
}