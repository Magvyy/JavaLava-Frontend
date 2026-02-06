import './feed.css'

import type { PostResponse } from '@/types/ApiResponses';
import { Post } from '@/features/posts';

interface FeedProps {
  onEdit: (post: PostResponse) => void,
  onDelete: (post: PostResponse) => void,
  onClick: (post: PostResponse) => void,
  posts: PostResponse[]
}
export default function Feed({ onEdit, onDelete, onClick, posts } : FeedProps) {

  return (
    <div id="posts-container">
      {posts.map(post => (
        <Post
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
          key={post.id}
        />
      ))}
    </div>
  )
}