import { useState } from 'react'
import './Home.css'

import { useHomePagePosts, useScrollToEnd } from "./functions";
import { Post } from '@/parts/posts/post';

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
          key={post.id}
          data={post}
        />
      ))}
    </div>
  )
}