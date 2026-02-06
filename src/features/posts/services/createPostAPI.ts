import type { PostRequest, PostResponse } from "@/types/ApiResponses";


export async function createPostAPI(post: PostRequest, callback: (post: PostResponse) => void, onError: ((message: string) => void) | null) {
    let response = await fetch("http://localhost:8080/post", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify(post)
        });
    if (response.ok) {
        let postDTOResponse = await response.json();
        callback(postDTOResponse);
    } else {
        if (onError != null) {
            onError(response.status.toString());
        }
    }
}
