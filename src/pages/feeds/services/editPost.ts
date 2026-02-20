import { createPostRequest } from "./createPostRequest";
import type { PostResponse } from "@/shared/types/PostApi";
import { editPostAPI } from "@/features/posts/services/editPostAPI";
import { displayError } from "@/shared/services/displayError";

export async function editPost(id: number, content: string, visible: boolean, onEdit: (post: PostResponse) => void) {
    if (content.trim().length === 0) {
        displayError("Content is empty.");
        return;
    }
    let postRequest = createPostRequest(id, content, visible);
    let postResponse = await editPostAPI(postRequest);
    onEdit(postResponse);
}