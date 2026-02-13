import type { CommentRequest, CommentResponse } from "@/shared/types/CommentApi";
import { useState } from "react";
import { getCurrentTime } from "../services/getCurrentTime";
import { createComment } from "../services/createComment";


export function useAddComment() {
    const [content, setContent] = useState<string>("");

    const submitComment = (post_id: number, addComment: (comment: CommentResponse) => void) => {
        let commentRequest: CommentRequest = {
            id: null,
            content: content,
            published: getCurrentTime(),
            post_id: post_id
        };
        createComment(commentRequest, addComment);
        setContent("");
    }

    return { content, setContent, submitComment }
}