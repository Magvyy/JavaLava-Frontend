import { ReadPost, usePostComments} from "@/features/posts";
import { useReadPost } from "./hooks/useReadPost";
import { useParams } from "react-router-dom";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import CommentSection from "@/features/comments/components/CommentSection";
import { AddComment } from "@/features/comments";
import type { CommentResponse } from "@/shared/types/CommentApi";
import Comments from "@/features/comments/components/Comments";
import { Loader } from "@/shared/components/Loader";



export function ReadPostPage() {
    const { id } = useParams<{ id: string }>();
    
    if (!id) {
        window.location.href = "/";
    }

    const { state: postState } = useReadPost(Number(id));
    const { comments, setComments, page, setPage, state: commentsState } = usePostComments(Number(id));

    const onDelete = (id: number) => {
        window.location.href = "/";
    }

    return (
        <Loader state={postState} className="w-full max-w-1/2 p-4">
            {(post) =>
                <div className="center-sidebar w-1/2 p-5">
                    <ReadPost post={post} className="w-full p-0 min-w-[200px]">
                        <PostHeader
                            post_id={post.id}
                            onDelete={onDelete}
                            user={post.user}
                        />
                        <PostContentReader
                            post={post}
                        />
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
                    </ReadPost>
                </div>
            }
        </Loader>
    )
}