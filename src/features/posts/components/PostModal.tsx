
// import "./css/post-modal.css"


// import type { PostResponse } from "@/types/ApiResponses";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { PostHeader } from "./PostHeader";
// import { usePostComments } from "../hooks/usePostComments";
// import { PostFooter } from "./read/PostFooterReader";
// import { PostContent } from "./read/PostContentReader";


// interface PostModalProps {
//   post: PostResponse
//   onClick: () => void,
//   onDelete: (id: number) => void,
//   mode: string
// }
// export function PostModal({ post, onClick, onDelete }: PostModalProps) {
//   const { id, user, content, published, like_count, comment_count } = post;
//   const [update, setUpdate] = useState<boolean>(true);
//   const { comments, setComments, state } = usePostComments(id, update);

//   const onEdit = () => {

//   }

//   return (
//     <div id="post-modal" onClick={() => onClick()}>
//       <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
//         <PostHeader
//           onDelete={onDelete}
//           onEdit={onEdit}
//           user={post.user}
//           postId={post.id}
//           onError={() => () => {}}
//         />
//         <PostContent
//           post={post}
//         />
//         <PostFooter
//           className="post-modal-footer"
//           post_id={post.id}
//           liked={post.liked}
//           comments={comments}
//         />
//       </Card>
//     </div>
//   )
// }