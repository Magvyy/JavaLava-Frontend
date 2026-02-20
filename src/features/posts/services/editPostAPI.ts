import type { PostRequest } from "@/shared/types/PostApi";

import env from "@/env/environment.json";
import { displayError } from "@/shared/services/displayError";

export async function editPostAPI(post: PostRequest) {
    let response = await fetch(env.backend + "/posts/" + post.id, {
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
        displayError(response.status.toString());
    }
}