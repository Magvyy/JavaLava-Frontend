import { useApiCall } from "@/shared/hooks/useApiCall";
import type { MessageResponse } from "@/shared/types/MessageApi";
import { useEffect, useState } from "react";

export const useConversationMessages = (userId: number) => {
    const [page, setPage] = useState<number>(0);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const { state, handleApiCall } = useApiCall<MessageResponse[]>();
    
    useEffect(() => {
        let data = state.result?.data;
        if (data) {
            let messagesToAdd: MessageResponse[] = [];
            data.forEach(add => {
                if (!messages.some(message => message.id == add.id)) messagesToAdd.push(add);
            })
            setMessages([...messagesToAdd, ...messages])
            setPage(page + 1);
        }
    }, [state])
    
    useEffect(() => {
        handleApiCall({
            endpoint: "http://localhost:8080/messages/" + userId + "?page=" + page,
            credentials: true,
            method: "GET",
        });
    }, [])

    return { messages, setMessages, page, setPage, state };
}