import type { MessageRequest, MessageResponse } from "@/shared/types/MessageApi";
import { useState } from "react";
import { createMessage } from "../services/createMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { displayError } from "@/shared/services/displayError";


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

    const sendMessage = async (userId: number) => {
        if (content.trim().length === 0) {
            displayError("Content is empty.");
            return;
        }
        let messageRequest: MessageRequest = {
            id: null,
            to_user_id: userId,
            content: content
        };
        mutate(messageRequest)
        setContent("");
    }

    return { content, setContent, sendMessage }
}