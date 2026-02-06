import type { PostResponse, State } from "@/types/ApiResponses";
import { useEffect, useState } from "react";


export const usePost = (id: number) => {
    const [post, setPost] = useState<PostResponse>({
        id: 0,
        user: {
            id: 0,
            user_name: "N/A"
        },
        content: "N/A",
        published: "N/A",
        visible: false,
        liked: false,
        like_count: 0,
        comment_count: 0
    });
    const [state, setState] = useState<State>({
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                let token = localStorage.getItem("jwt");
                const response = await
                    fetch("http://localhost:8080/post/" + id, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                if (response.ok) {
                    const postJSON = await response.json();
                    setPost(postJSON)
                    setState({
                        loading: false,
                        error: null
                    });
                } else {
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err: any) {
                setState({ loading: false, error: err.message });
            }
        }
        fetchPost();
    }, []);

    return { post, setPost, state };
}