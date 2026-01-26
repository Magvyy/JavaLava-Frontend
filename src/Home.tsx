import { useEffect, useState } from 'react'
import './Home.css'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  const { posts, state } = usePostData();
  
  if ( state.loading ) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div id="posts-container">
      {posts.map(post => (
        <Post
          key={post.post_id}
          post={post}
        />
      ))}
    </div>
  )
}

interface PostProps {
  post: Post
}

function Post(post: PostProps) {
  let data = post.post;
  const author = data.user_id;
  const like_count = data.like_count;
  const comment_count = data.comment_count;


  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>
          {data.user_name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.content}</p>
      </CardContent>
      <CardFooter>
        {data.published}
      </CardFooter>
    </Card>
  )
}

export const usePostData = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [state, setState] = useState<PostState>({
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let token = localStorage.getItem("jwt");
                const response = await
                    fetch("http://localhost:8080/post/all?page=0", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                if (response.ok) {
                    const postsJSON = await response.json();
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
        fetchPosts();
    }, []);
    return { posts, state };
}