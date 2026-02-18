import { ConversationUser } from "@/features/messages/components/ConversationUser";
import { Loader } from "@/shared/components/Loader";
import { useUser } from "@/shared/hooks/useUser";
import { useParams } from "react-router-dom";
import { Message } from "@/features/messages";
import { MessageSender } from "@/features/messages/components/MessageSender";
import type { MessageResponse } from "@/shared/types/MessageApi";
import { useAuth } from "@/contexts/AuthContext";
import { useRef } from "react";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";

export function Conversation() {
    const { id } = useParams<{ id: string }>();
    if (id === undefined) window.location.href = "/"

    const { authUser, authState } = useAuth();
    if (authUser && Number(id) == authUser.id) window.location.href = "/";

    const { state: friendState } = useUser(Number(id));

    const containerRef = useRef<HTMLDivElement>(null);
    const { data: messages, setData: setMessages, state: messagesState } = useScrollToEnd<MessageResponse>(
        "/messages/" + Number(id),
        containerRef,
        false,
        0,
        true
    );

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
            <div ref={containerRef} className="p-5 flex-1 flex flex-col gap-[10px] overflow-auto scrollbar-hide">
                <Loader state={messagesState} data={messages} className="p-5 flex-1">
                    {(messages, spinner) =>
                        messages.length !== 0 ? (
                            <>
                                {messages.map(message => (
                                    <Message
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </>
                        ) : spinner
                    }
                </Loader>
            </div>
            <MessageSender
                user_id={Number(id)}
                addMessage={(message: MessageResponse) => setMessages([...messages, message])}
                className="w-full p-2"
            />
        </div>
    )
}