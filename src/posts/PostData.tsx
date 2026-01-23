import { useEffect, useState } from 'react';

// export 

export interface PostData {
    content: string,
    published: string,
    visible: boolean,
    userName: string,
    userId: number | null
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

    const [data, setData] = useState<PostData>({
        content: "",
        published: new Date().toLocaleDateString("en-CA"),
        visible: false,
        userName: "",
        userId: null
    });

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await
                fetch("http://localhost:8080/post/" + postId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                if (response.ok) {
                    const postData = await response.json();
                    setData({
                        content: postData.content,
                        published: postData.published,
                        visible: postData.visible,
                        userName: postData.user_name,
                        userId: postData.user_id
                    });
                    setState({
                        loading: false,
                        error: null
                    });
                }
            } catch (err: any) {
                setState({ loading: false, error: err.message });
            }
        }
        fetchPostData();
    }, []);

    return { data, state };
}