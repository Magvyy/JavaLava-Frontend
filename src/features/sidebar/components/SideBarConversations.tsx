import { useAuth } from "@/contexts/AuthContext";
import { SideBarConversation } from "./SideBarConversation";
import { Loader } from "@/shared/components/Loader";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";
import type { MessageResponse } from "@/types/ApiResponses";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";


interface SideBarConversationsProps {

}

export function SideBarConversations({  }: SideBarConversationsProps) {
    const { authUser, authState } = useAuth();
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: conversations, setData: setConversations, state, reset } = useScrollToEnd<MessageResponse>(
        "/messages",
        containerRef
    );

    console.log(conversations)

    const updateMessageOnSideBar = (messageToUpdate: MessageResponse) => {
        const friendId = (authUser && authUser.id == messageToUpdate.from.id) ? messageToUpdate.to.id : messageToUpdate.from.id
        setConversations(
            prev => [
                messageToUpdate,
                ...prev.filter(message => {
                    const messageId = (authUser && authUser.id == message.from.id) ? message.to.id : message.from.id
                    if (friendId != messageId) {
                        return message;
                    }
                })
            ]
        );
    }

    const update = async () => {
        reset();
        return 0;
    }

    const { data } = useQuery({
        queryKey: ["Conversations"],
        queryFn: async () => await update()
    })

    return (
        <Loader state={state} data={conversations} className="w-full p-4">
            {(conversations) => 
                <div className="flex flex-col gap-[10px] w-full" ref={containerRef}>
                    {conversations.map(conversation => 
                        <SideBarConversation
                            key={(authUser && authUser.id == conversation.from.id) ? conversation.to.id : conversation.from.id}
                            message={conversation}
                            updateMessage={updateMessageOnSideBar}
                        />
                    )
                    }
                </div>
            }
        </Loader>
    )
}