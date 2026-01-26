import { useEffect, useState } from 'react'
import './Home.css'

interface Post {
  content: string,
  published: string,
  visible: boolean,
  user_id: number,
  user_name: string,
  like_count: number,
  comment_count: number,
  post_id: number
}

interface PostState {
  loading: boolean,
  error: string | null
}

export default function Secret() {
  const [posts, setPosts] = useState<Post[]>([]);
  

  return (
    <></>
  )
}





export const usePostData = (postId: number | null) => {
    const [state, setState] = useState<PostState>({
        loading: true,
        error: null
    });

    const [posts, setPosts] = useState<Post>([]);

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
                    const postsJSON = await response.json();
                    console.log(postsJSON);
                    setPosts(postsJSON);
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
        if (postId) {
            fetchPostData();
        } else {
            setState({ loading: false, error: "Can't view post with null id" });
        }
    }, []);
    return { posts, state };
}