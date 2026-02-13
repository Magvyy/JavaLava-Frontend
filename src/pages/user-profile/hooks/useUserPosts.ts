import { useApiCall } from "@/shared/hooks/useApiCall";
import type { PostResponse } from "@/shared/types/PostApi";
import { useEffect, useRef, useState } from "react";

export const useUserPosts = (userId: number) => {
    const [page, setPage] = useState<number>(0);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const { state, handleApiCall } = useApiCall<PostResponse[]>();

    useEffect(() => {
        let data = state.result?.data;
        if (data) {
            let postsToAdd: PostResponse[] = [];
            data.forEach(add => {
                if (!posts.some(post => post.id == add.id)) postsToAdd.push(add);
            })
            setPosts([...postsToAdd, ...posts])
            setPage(page + 1);
        }
    }, [state])
    
    useEffect(() => {
        handleApiCall({
            endpoint: "http://localhost:8080/post/user/" + userId + "?page=" + page,
            credentials: true,
            method: "GET",
        });
    }, [])

    const resetPosts = () => {
        setPosts([]);
        setPage(0);
        handleApiCall({
            endpoint: "http://localhost:8080/post/user/" + userId + "?page=0",
            credentials: true,
            method: "GET",
        });
    };

    return { posts, setPosts, state, resetPosts };
};
