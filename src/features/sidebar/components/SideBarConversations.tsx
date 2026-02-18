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
                        />
                    )
                    }
                </div>
            }
        </Loader>
    )
}