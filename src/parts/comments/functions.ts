import type { CommentRequest, CommentResponse } from "@/types/ApiResponses";

export function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(",", "")
    .replaceAll("/", "-");
}

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