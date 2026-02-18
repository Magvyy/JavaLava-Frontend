import { getCurrentTime } from "@/features/comments/services/getCurrentTime";
import type { MessageRequest, MessageResponse } from "@/shared/types/MessageApi";
import { useState } from "react";
import { createMessage } from "../services/createMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useSendMessage(addMessage: (messageResponse: MessageResponse) => void) {
    const [content, setContent] = useState<string>("");

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createMessage,
        onSuccess: (newMessage: MessageResponse) => {
            addMessage(newMessage);
            queryClient.setQueryData<MessageResponse[]>(
                ["messages", newMessage.id],
                (old) => old ? [...old, newMessage] : [newMessage]
            );
            queryClient.invalidateQueries({ queryKey: ["Conversations"] });
        },
    });

    const sendMessage = async (user_id: number) => {
        let messageRequest: MessageRequest = {
            id: null,
            to_user_id: user_id,
            content: content,
            sent: getCurrentTime()
        };
        mutate(messageRequest)
        setContent("");
    }

    return { content, setContent, sendMessage }
}