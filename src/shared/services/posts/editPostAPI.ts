import type { PostRequest } from "@/shared/types/PostApi";


import { displayError } from "@/shared/services/displayError";

export async function editPostAPI(post: PostRequest, file?: File) {
    const formData = new FormData();
    
    formData.append("post", new Blob([JSON.stringify(post)], { type: "application/json" }));

    if (file) formData.append("attachment", file);

    let response = await fetch(import.meta.env.VITE_API_URL + "/posts/" + post.id, {
            credentials: "include",
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            },
            body: formData
        });
    if (response.ok) {
        let postDTOResponse = await response.json();
        return postDTOResponse;
    } else {
        displayError(response.status.toString());
    }
}