import type { MessageRequest, MessageResponse } from "@/shared/types/MessageApi";

import env from "@/env/environment.json";

export async function createMessage(messageRequest: MessageRequest): Promise<MessageResponse>  {
    let response = await fetch(env.backend + "/messages", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(messageRequest)
    })
    if (!response.ok) {
        
    }
    return response.json();
}