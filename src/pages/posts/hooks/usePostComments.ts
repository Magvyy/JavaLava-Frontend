import { useApiCall } from "@/shared/hooks/useApiCall";
import type { CommentResponse } from "@/shared/types/CommentApi";
import { useEffect, useState } from "react";

export const usePostComments = (postId: number) => {
    const [page, setPage] = useState<number>(0);
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const { state, handleApiCall } = useApiCall<CommentResponse[]>();

    useEffect(() => {
        let data = state.result?.data;
        if (data) {
            let commentsToAdd: CommentResponse[] = [];
            data.forEach(add => {
                if (!comments.some(comment => comment.id == add.id)) commentsToAdd.push(add);
            })
            setComments([...commentsToAdd, ...comments])
            setPage(page + 1);
        }
    }, [state])
    
    useEffect(() => {
        handleApiCall({
            endpoint: "http://localhost:8080/post/" + postId  + "/comments?page=" + page,
            credentials: true,
            method: "GET",
        });
    }, [])

    return { comments, setComments, page, setPage, state };
}