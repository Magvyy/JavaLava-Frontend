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
            queueMicrotask(() => {
                setPosts([]);
                setState({ loading: true, error: null });
            });
        }

        if (userId == null) {
            queueMicrotask(() => {
                setState({ loading: false, error: "missing-user" });
            });
            return;
        }
        const fetchPosts = async () => {
            let pageKey = "";
            let inFlightAdded = false;
            try {
                const token = localStorage.getItem("jwt");
                const currentPage = pageRef.current;
                pageKey = `${userId}-${currentPage}`;
                if (fetchedRef.current.has(pageKey) || inFlightRef.current.has(pageKey)) {
                    return;
                }
                inFlightRef.current.add(pageKey);
                inFlightAdded = true;
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
                    setPosts((prev) => {
                        const seen = new Set(prev.map((post) => post.id));
                        const merged = [...prev];
                        for (const post of postsJSON as PostResponse[]) {
                            if (!seen.has(post.id)) {
                                merged.push(post);
                                seen.add(post.id);
                            }
                        }
                        return merged;
                    });
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
                if (inFlightAdded && pageKey) {
                    inFlightRef.current.delete(pageKey);
                }
            }
        };
        fetchPosts();
    }, [update, userId]);

    return { posts, setPosts, state };
};
