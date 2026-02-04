import type { CommentRequest, CommentResponse } from "@/types/ApiResponses";


export async function createComment(commentRequest: CommentRequest, addComment: (comment: CommentResponse) => void) {
    let token = localStorage.getItem("jwt");
    let response = await fetch("http://localhost:8080/post/" + commentRequest.post_id + "/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(commentRequest)
    })
    if (response.ok) {
        let comment = await response.json();
        addComment(comment);
    }
}