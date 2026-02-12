import type { MessageRequest, MessageResponse } from "@/shared/types/MessageApi";


export async function createMessage(messageRequest: MessageRequest, addMessage: (message: MessageResponse) => void) {
    let response = await fetch("http://localhost:8080/messages", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(messageRequest)
    })
    if (response.ok) {
        let message = await response.json();
        console.log("?")
        addMessage(message);
    }
}