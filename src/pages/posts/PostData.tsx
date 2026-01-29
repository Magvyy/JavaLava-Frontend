import { getCurrentTime } from '@/parts/comments/functions';
import type { PostResponse } from '@/types/ApiResponses';
import { useEffect, useState } from 'react';

// export 

export interface PostData {
    id: number | null
    user_name: string,
    user_id: number | null
    content: string,
    published: string,
    visible: boolean,
}

export interface PostState {
  loading: boolean;
  error: string | null;
}

export const usePostData = (postId: number) => {
    const [state, setState] = useState<PostState>({
        loading: true,
        error: null
    });

    const [post, setPost] = useState<PostResponse | null>({
        id: postId,
        user_name: "",
        user_id: 0,
        content: "",
        published: getCurrentTime(),
        visible: false,
        like_count: 0,
        comment_count: 0
    });

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                let token = localStorage.getItem("jwt");
                const response = await
                    fetch("http://localhost:8080/post/" + postId, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                if (response.ok) {
                    const postDTO = await response.json();
                    setPost(postDTO);
                    setState({
                        loading: false,
                        error: null
                    });
                } else {
                    setPost(null);
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err: any) {
                setPost(null);
                setState({ loading: false, error: err.message });
            }
        }
        if (postId) {
            fetchPostData();
        } else {
            setPost(null);
            setState({ loading: false, error: "Can't view post with null id" });
        }
    }, []);
    return { post, setPost, state, setState };
}