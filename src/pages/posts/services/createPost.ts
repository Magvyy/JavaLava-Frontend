import { createPostAPI } from "@/features/posts/services/createPostAPI";
import { createPostRequest } from "./createPostRequest";
import type { PostResponse } from "@/shared/types/PostApi";
import { displayError } from "@/shared/services/displayError";

export async function createPost(content: string, visible: boolean, onCreate: (post: PostResponse) => void) {
    if (content.trim().length === 0) {
        displayError("Content is empty.");
        return;
    }
    let postRequest = createPostRequest(null, content, visible);
    let postResponse = await createPostAPI(postRequest);
    onCreate(postResponse);
}