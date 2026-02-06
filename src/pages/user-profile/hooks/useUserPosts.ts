import type { PostResponse, State } from "@/types/ApiResponses";
import { useEffect, useRef, useState } from "react";

export const useUserPosts = (userId: number | null, update: boolean) => {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [state, setState] = useState<State>({
        loading: true,
        error: null
    });
    const pageRef = useRef<number>(0);
    const userIdRef = useRef<number | null>(null);
    const fetchedRef = useRef<Set<string>>(new Set());
    const inFlightRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (userIdRef.current !== userId) {
            userIdRef.current = userId;
            pageRef.current = 0;
            fetchedRef.current.clear();
            inFlightRef.current.clear();
            setPosts([]);
            setState({ loading: true, error: null });
            
        }

        if (!userId) {
            setPosts([]);
            setState({ loading: false, error: "missing-user" });
            return;
        }
        const fetchPosts = async () => {
            let pageKey = "";
            try {
                const token = localStorage.getItem("jwt");
                const currentPage = pageRef.current;
                pageKey = `${userId}-${currentPage}`;
                if (fetchedRef.current.has(pageKey) || inFlightRef.current.has(pageKey)) {
                    return;
                }
                inFlightRef.current.add(pageKey);
                const response = await fetch(
                    "http://localhost:8080/post/user/" + userId + "?page=" + currentPage,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                if (response.ok) {
                    const postsJSON = await response.json();
                    setPosts(prev => [
                        ...prev,
                        ...(postsJSON as PostResponse[]).filter(post => !prev.some(p => p.id === post.id))
                    ]);
                    setState({ loading: false, error: null });
                    pageRef.current = currentPage + 1;
                    fetchedRef.current.add(pageKey);
                } else {
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err) {
                if (err instanceof Error) {
                    setState({ loading: false, error: err.message });
                } else {
                    setState({ loading: false, error: "unknown-error" });
                }
            } finally {
                inFlightRef.current.delete(pageKey);
                
            }
        };
        fetchPosts();
    }, [update, userId]);

    return { posts, setPosts, state };
};
