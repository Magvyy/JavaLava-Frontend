import { getCurrentTime } from "@/features/comments/services/getCurrentTime";
import type { MessageRequest, MessageResponse } from "@/shared/types/MessageApi";
import { useState } from "react";
import { createMessage } from "../services/createMessage";


export function useSendMessage() {
    const [content, setContent] = useState<string>("");

    const sendMessage = (user_id: number, addMessage: (messageRequest: MessageResponse) => void) => {
        let messageRequest: MessageRequest = {
            id: null,
            to_user_id: user_id,
            content: content,
            sent: getCurrentTime()
        };
        createMessage(messageRequest, addMessage);
        setContent("");
    }

    return { content, setContent, sendMessage }
}