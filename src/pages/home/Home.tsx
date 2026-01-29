import { useState } from 'react'
import './Home.css'

import { useHomePagePosts, useScrollToEnd } from "./functions";
import { Post, AddPost } from '@/parts/posts/post';
import type { PostResponse } from '@/types/ApiResponses';

export default function Home() {
  const [update, setUpdate] = useState<boolean>(true);
  const { posts, setPosts, state } = useHomePagePosts(update);
  
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
      <AddPost
        addPost={(post: PostResponse) => {
          setPosts([post, ...posts]);
          console.log(posts);
        }}
      />
      {posts.map(post => (
        <Post
          key={post.id}
          data={post}
        />
      ))}
    </div>
  )
}