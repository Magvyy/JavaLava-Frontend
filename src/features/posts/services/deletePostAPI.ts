import type { PostResponse } from "@/types/ApiResponses";

export async function deletePostAPI(post: PostResponse, onDelete: ((post: PostResponse) => void), onError: ((message: string) => void) | null) {
    let token = localStorage.getItem("jwt");
    const response = await
        fetch("http://localhost:8080/post/" + post.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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