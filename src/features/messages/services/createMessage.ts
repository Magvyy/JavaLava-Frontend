import type { MessageRequest, MessageResponse } from "@/shared/types/MessageApi";

import env from "@/env/environment.json";

export async function createMessage(messageRequest: MessageRequest): Promise<MessageResponse>  {
    let response = await fetch(env.backend + "/messages/" + messageRequest.to_user_id, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(messageRequest as MessageRequest)
    })
    if (!response.ok) {
        
    }
    return response.json();
}