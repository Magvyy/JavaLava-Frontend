import type { PostRequest, PostResponse } from "@/types/ApiResponses";


export async function editPost(post: PostRequest, callback: (post: PostResponse) => void, onError: ((message: string) => void) | null) {
    let token = localStorage.getItem("jwt");
    let response = await fetch("http://localhost:8080/post" + post.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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