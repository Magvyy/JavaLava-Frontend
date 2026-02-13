import { useApiCall } from "@/shared/hooks/useApiCall";
import type { PostResponse } from "@/shared/types/PostApi";
import { useEffect, useState } from "react";


export const useHomePagePosts = (endpoint: string) => {
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
            endpoint: "http://localhost:8080/post/" + endpoint + "?page=" + page,
            credentials: true,
            method: "GET",
        });
    }, [])

    return { posts, setPosts, page, setPage, state };
}