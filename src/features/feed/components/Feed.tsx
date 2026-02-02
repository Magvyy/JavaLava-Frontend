import { useEffect, useState } from 'react'
import './feed.css'

import type { PostResponse } from '@/types/ApiResponses';
import { useHomePagePosts } from '../hooks/useHomePagePosts';
import { useScrollToEnd } from '../hooks/useScrollToEnd';
import { Post } from '@/features/posts';

export default function Feed() {
  const [update, setUpdate] = useState<boolean>(true);
  const { posts, setPosts, state } = useHomePagePosts(update);
  
  useScrollToEnd(() => {
    if (update) setUpdate(false)
    else setUpdate(true);
  });

  useEffect(() => {

  }, [posts, state]);

  if ( state.loading ) {
    return (
      <p>Loading...</p>
    )
  }

  const onCreate = (post: PostResponse) => {
    setPosts([post, ...posts]);
  }

  const onEdit = (edit: PostResponse) => {
    let temp = posts.map(post => {
      if (post.id === edit.id) {
        return edit;
      } else {
        return post;
      }
    });
    setPosts(temp);
  }

  const onDelete = (del: PostResponse) => {
    let temp = posts.filter(post => {
      if (post.id !== del.id) {
        return post;
      }
    })
    setPosts(temp);
  }

  return (
    <div id="posts-container">
      {posts.map(post => (
        <Post
          post={post}
          onCreate={onCreate}
          onEdit={onEdit}
          onDelete={onDelete}
          onError={() => {}}
          key={post.id}
        />
      ))}
    </div>
  )
}