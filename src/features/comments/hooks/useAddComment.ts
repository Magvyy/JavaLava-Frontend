import type { CommentRequest, CommentResponse } from "@/shared/types/CommentApi";
import { useState } from "react";
import { createComment } from "../services/createComment";
import { displayError } from "@/shared/services/displayError";


export function useAddComment() {
    const [content, setContent] = useState<string>("");

    const submitComment = (postId: number, addComment: (comment: CommentResponse) => void) => {
        if (content.trim().length === 0) {
            displayError("Content is empty.");
            return;
        }
        let commentRequest: CommentRequest = {
            id: null,
            content: content,
            post_id: postId
        };
        createComment(commentRequest, addComment);
        setContent("");
    }

    return { content, setContent, submitComment }
}