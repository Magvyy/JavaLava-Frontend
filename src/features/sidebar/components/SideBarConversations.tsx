import { useConversations } from "../hooks/useConversations";
import { useState } from "react";
import { SideBarConversation } from "./SideBarConversation";

interface SideBarConversationsProps {

}

export function SideBarConversations({  }: SideBarConversationsProps) {
    const [update, setUpdate] = useState<boolean>(false);
    const { state } = useConversations(update);

    return (
        <div className="flex flex-col gap-[10px] w-full">
            {conversations.map(conversation => (
                <SideBarConversation
                    key={conversation.id}
                    message={conversation}
                />
            ))}
        </div>
    )
}