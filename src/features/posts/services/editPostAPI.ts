import type { PostRequest, PostResponse } from "@/shared/types/PostApi";

import env from "@/env/environment.json";

export async function editPostAPI(post: PostRequest, onEdit: (post: PostResponse) => void, onError: ((message: string) => void) | null) {
    let response = await fetch(env.backend + "/post/" + post.id, {
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify(post)
        });
    if (response.ok) {
        let postDTOResponse = await response.json();
        return postDTOResponse;
    } else {
        if (onError != null) {
            onError(response.status.toString());
        }
    }
}