import { useApiCall } from "@/shared/hooks/useApiCall";
import type { MessageResponse } from "@/shared/types/MessageApi";
import { useEffect, useState } from "react";

export const useConversations = (update: boolean) => {
    const [submit, setSubmit] = useState<boolean>(false);
    const { state, handleApiCall } = useApiCall<MessageResponse[]>();
    if (!submit) {
        handleApiCall({
            endpoint: "http://localhost:8080/messages",
            credentials: true,
            method: "GET",
        });
        setSubmit(true);
    }
    
    return { state }
}