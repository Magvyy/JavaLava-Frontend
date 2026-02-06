import type { PostResponse } from "@/types/ApiResponses";

export async function deletePostAPI(post: PostResponse, onDelete: ((post: PostResponse) => void), onError: ((message: string) => void) | null) {
    const response = await
        fetch("http://localhost:8080/post/" + post.id, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    if (response.ok) {
        onDelete(post);
    } else {
        if (onError != null) {
            onError(response.status.toString());
        }
    }
}