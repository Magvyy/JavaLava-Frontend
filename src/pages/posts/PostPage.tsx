import { Post} from "@/features/posts";
import { usePost } from "./hooks/usePost";
import { usePostComments } from "./hooks/usePostComments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type { PostResponse } from "@/types/ApiResponses";



export function PostPage() {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        window.location.href = "/";
    }
    const { post, setPost } = usePost(Number(id));
    const { comments, setComments } = usePostComments(Number(id));

    const onEdit = (post: PostResponse) => {
        setPost(post);
    }

    const onDelete = () => {
        window.location.href = "/";
    }

    useEffect(() => {
    }, [post, comments]);

    return (
        <Post
            post={post}
            comments={comments}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    )
}