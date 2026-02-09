import { ReadPost} from "@/features/posts";
import { usePost } from "./hooks/usePost";
import { usePostComments } from "./hooks/usePostComments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import CommentSection from "@/features/comments/components/CommentSection";
import { AddComment } from "@/features/comments";
import type { CommentResponse } from "@/types/ApiResponses";
import Comments from "@/features/comments/components/Comments";



export function ReadPostPage() {
    const { id } = useParams<{ id: string }>();
    
    if (!id) {
        window.location.href = "/";
    }

    const { post, setPost } = usePost(Number(id));
    const { comments, setComments } = usePostComments(Number(id));

    const onDelete = (id: number) => {
        window.location.href = "/";
    }

    useEffect(() => {
    }, [post, comments]);

    return (
        <ReadPost
            post={post}
            headerChild={
                <PostHeader
                    post_id={post.id}
                    onDelete={onDelete}
                    user={post.user}
                />
            }
            contentChild={
                <PostContentReader
                    post={post}
                />
            }
            footerChild={
                <PostFooterReader
                    post_id={post.id}
                    liked={post.liked}
                    comments={comments}
                    setComments={setComments}
                    commentSectionChild={
                        <CommentSection
                            adderChild={
                                <AddComment
                                    post_id={post.id}
                                    addComment={(comment: CommentResponse) => setComments([comment, ...comments])}
                                />
                            }
                            commentsChild={
                                <Comments
                                    comments={comments}
                                />
                            }
                        />
                    }
                />
            }
        />
    )
}