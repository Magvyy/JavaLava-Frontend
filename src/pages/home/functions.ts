import type { CommentRequest, CommentResponse, PostResponse, State } from "@/types/ApiResponses";
import { useEffect, useState } from "react";

// hook that checks if user has scrolled to the end
export function useScrollToEnd(onEnd: () => void, offset = 0) {
  useEffect(() => {
    const handleScroll = () => {
      const viewportBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (viewportBottom >= documentHeight - offset) {
        onEnd();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onEnd, offset])
}

// hook that fetches posts for the home page
export const useHomePagePosts = (update: boolean) => {
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
                    fetch("http://localhost:8080/post/all?page=" + page, {
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
    return { posts, state };
}