import { useAuth } from "@/contexts/AuthContext";
import { SideBarConversation } from "./SideBarConversation";
import { Loader } from "@/shared/components/Loader";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";
import type { MessageResponse } from "@/shared/types/MessageApi";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { WebSocketService } from "@/shared/services/WebSocketService";


interface SideBarConversationsProps {

}

export function SideBarConversations({  }: SideBarConversationsProps) {
    const { authUser, authState } = useAuth();

    if (!authUser) return;
    
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
        
    const ws = useRef<WebSocketService<MessageResponse> | null>(null);

    useEffect(() => {
        ws.current = new WebSocketService((message: MessageResponse) => {
            const otherId = (authUser.id === message.from.id) ? message.to.id : message.from.id;
            setConversations(prev => prev.map(conv => {
                if (conv.id === otherId) {
                    message.id = otherId;
                    return message;
                }
                else return conv;
            }))
        }, "messages");

        return () => {
            ws.current?.disconnect();
            ws.current = null;
        };
    }, []);

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