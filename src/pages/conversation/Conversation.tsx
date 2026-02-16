import { ConversationUser } from "@/features/messages/components/ConversationUser";
import { Loader } from "@/shared/components/Loader";
import { useUser } from "@/shared/hooks/useUser";
import { useParams } from "react-router-dom";
import { Message } from "@/features/messages";
import { MessageSender } from "@/features/messages/components/MessageSender";
import type { MessageResponse } from "@/shared/types/MessageApi";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedData } from "@/shared/hooks/usePaginatedData";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";


export function Conversation() {
    const { id } = useParams<{ id: string }>();
    if (id === undefined) window.location.href = "/"

    const { authUser, authState } = useAuth();
    if (authUser && Number(id) == authUser.id) window.location.href = "/";

    const { state: friendState } = useUser(Number(id));

    const { data: messages, setData: setMessages, page, setPage, state: messagesState } = usePaginatedData<MessageResponse>("http://localhost:8080/messages/" + Number(id));
    useScrollToEnd(() => setPage(prev => prev + 1));

    useEffect(() => {
        let temp = document.getElementById("conversation");
        if (temp) temp.scrollTop = temp.scrollHeight;
    }, [messages])

    return (
        <div className="w-full h-full flex flex-col">
            <Loader state={friendState} className="p-5 border-b-1">
                {(user) => 
                    <ConversationUser
                        user={user}
                        className="flex gap-[10px] p-5 border-b-1"
                    />
                }
            </Loader>
            <Loader state={messagesState} data={messages} upwards={true} className="p-5 flex-1">
                {(messages) =>
                    messages.length !== 0 ? (
                        <div id="conversation" className="p-5 flex-1 flex flex-col gap-[10px] overflow-y-scroll">
                            {messages.map(message => (
                                <Message
                                    key={message.id}
                                    message={message}
                                />
                            ))}
                        </div>
                    ) : <></>
                }
            </Loader>
            <MessageSender
                user_id={Number(id)}
                addMessage={(message: MessageResponse) => setMessages([...messages, message])}
                className="w-full p-2"
            />
        </div>
    )
}