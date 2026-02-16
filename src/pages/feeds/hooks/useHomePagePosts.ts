import { useApiCall } from "@/shared/hooks/useApiCall";
import type { PostResponse } from "@/shared/types/PostApi";
import { useEffect, useState } from "react";


export const useHomePagePosts = (endpoint: string) => {
    const [page, setPage] = useState<number>(0);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const { state, handleApiCall } = useApiCall<PostResponse[]>();

    useEffect(() => {
        handleApiCall({
            endpoint: "http://localhost:8080/post/" + endpoint + "?page=" + page,
            credentials: true,
            method: "GET",
        });
    }, [page])
    
    useEffect(() => {
        const data = state.result?.data;
        if (!data) return;

        setPosts(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newItems = data.filter(item => !existingIds.has(item.id));
            return [...prev, ...newItems];
        })
    }, [state.result?.data])

    return { posts, setPosts, page, setPage, state };
}