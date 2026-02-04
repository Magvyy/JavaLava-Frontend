import type { PostResponse, State } from "@/types/ApiResponses";
import { useEffect, useState } from "react";


export const useHomePagePosts = (update: boolean, endpoint: string) => {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [state, setState] = useState<State>({
        loading: true,
        error: null
    });
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let token = localStorage.getItem("jwt");
                const response = await
                    fetch("http://localhost:8080/post/" + endpoint + "?page=" + page, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                if (response.ok) {
                    const postsJSON = await response.json();
                    setPosts([...posts, ...postsJSON]);
                    setState({
                        loading: false,
                        error: null
                    });
                    setPage(page + 1);
                } else {
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err: any) {
                setState({ loading: false, error: err.message });
            }
        }
        fetchPosts();
    }, [update]);
    return { posts, setPosts, state };
}