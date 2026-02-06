import type { CommentRequest, CommentResponse } from "@/types/ApiResponses";


export async function createComment(commentRequest: CommentRequest, addComment: (comment: CommentResponse) => void) {
    let response = await fetch("http://localhost:8080/post/" + commentRequest.post_id + "/comments", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(commentRequest)
    })
    if (response.ok) {
        let comment = await response.json();
        addComment(comment);
    }
}