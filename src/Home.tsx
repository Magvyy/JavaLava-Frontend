import { useEffect, useState } from 'react'
import './Home.css'

import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import user from "./assets/user.svg";


export default function Home() {
  const [update, setUpdate] = useState<boolean>(true);
  const { posts, state } = useHomePagePosts(update);
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
          data={post}
        />
      ))}
    </div>
  )
}

interface PostProps {
  data: Post
}

function formatDateStringToDDMonthYear(dateString: string): string {
  const dateObj = new Date();
  const parts = dateString.split(' ');

  const dateParts = parts[0].split('-');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; 
  const year = parseInt(dateParts[2], 10);
  dateObj.setUTCFullYear(year, month, day);

  const timeParts = parts[1].split(":");
  const hour = parseInt(timeParts[0], 10) - 1;
  const minute = parseInt(timeParts[1], 10);
  dateObj.setUTCHours(hour, minute, 0, 0);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: "numeric",
    minute: "numeric"
  };

  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  return formattedDate;
}

function Post(props: PostProps) {
  const { content, published, user_name, like_count, comment_count, post_id } = props.data;
  const [modal, setModal] = useState<boolean>(false);

  if (modal) {
    return (
      <PostModal
        data={props.data}
        callback={() => {
          setModal(false);
        }}
      />
    )
  }

  return (
    <Card className="mx-auto w-full max-w-sm post" onClick={() => setModal(true)}>
      <CardContent >
        <div className="post-user">
          <img src={user}/>
          <div className="header-container">
            <p className="user-name">{user_name}</p>
            <p className="published">{formatDateStringToDDMonthYear(published)}</p>
          </div>
        </div>
        <p className="post-content">{content}</p>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

interface PostModalProps {
  data: Post
  callback: () => void
}

function PostModal(props: PostModalProps) {
  const { content, published, user_name, like_count, comment_count, post_id } = props.data;
  const [update, setUpdate] = useState<boolean>(true);
  const { comments, setComments, state } = usePostComments(post_id, update);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div id="post-modal" onClick={() => props.callback()}>
      <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
        <CardContent >
          <div className="post-user">
            <img src={user}/>
            <div className="header-container">
              <p className="user-name">{user_name}</p>
              <p className="published">{formatDateStringToDDMonthYear(published)}</p>
            </div>
          </div>
          <p className="post-content">{content}</p>
        </CardContent>
        <CardFooter id="post-modal-comment-section">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
            />
          ))}
          <AddComment
            post_id={post_id}
            callback={(comment: Comment) => {
              setComments([...comments, comment]);
            }}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

interface CommentProps {
  comment: Comment
}
function Comment(comment: CommentProps) {
  const data = comment.comment;
  
  return (
    <div className="comment">
      <img src={user}/>
      <div className="content-container">
        <p className="user-name">{data.user_name}</p>
        <p className="content">{data.content}</p>
      </div>
    </div>
  );
}


interface AddCommentProps {
  post_id: number,
  callback: (comment: Comment) => void
}
function AddComment(props: AddCommentProps) {
  const [content, setContent] = useState<string>("");

  function getPublished() {
    const now = new Date();
    return now.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(",", "")
    .replaceAll("/", "-");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify({
        "content": content,
        "published": getPublished(),
        "post_id": props.post_id
      }));
    let token = localStorage.getItem("jwt");
    let response = await fetch("http://localhost:8080/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "content": content,
        "published": getPublished(),
        "post_id": props.post_id
      })
    })
    if (response.ok) {
      let comment = await response.json();
      props.callback(comment);
    }
  }
  
  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Write something..."
          onChange={e => {setContent(e.target.value);}}
        />
        <button type="submit" style={{display: "none"}}/>
      </form>
    </div>
  );
}

function useScrollToEnd(onEnd: () => void, offset = 0) {
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


interface State {
  loading: boolean,
  error: string | null
}
interface Post {
  content: string,
  published: string,
  user_name: string,
  like_count: number,
  comment_count: number,
  post_id: number
}
const useHomePagePosts = (update: boolean) => {
    const [posts, setPosts] = useState<Post[]>([]);
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


interface Comment {
  content: string,
  published: string,
  user_id: number,
  user_name: string,
  id: number
}
const usePostComments = (postId: number, update: boolean) => {
    const [comments, setComments] = useState<Comment[]>([]);
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
                    fetch("http://localhost:8080/comment/post/" + postId  + "?page=" + page, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                if (response.ok) {
                    const postsJSON = await response.json();
                    setComments([...comments, ...postsJSON]);
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
    return { comments, setComments, state };
}