import { use, useEffect, useState } from 'react'
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

import user from "./assets/user.svg";

interface PostState {
  loading: boolean,
  error: string | null
}

export default function Home() {
  const [update, setUpdate] = useState<boolean>(true);
  const { posts, state } = usePostData(update);
  useScrollToEnd(() => {
    if (update) setUpdate(false)
    else setUpdate(true);
  });

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
    <Card className="mx-auto w-full max-w-sm post">
      <CardHeader>
        <CardTitle className="post-user">
          <img src={user}/>
          {data.user_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="post-content">
        {data.content}
      </CardContent>
      <CardFooter className="post-published">
        {data.published}
      </CardFooter>
    </Card>
  )
}

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

export const usePostData = (update: boolean) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [state, setState] = useState<PostState>({
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