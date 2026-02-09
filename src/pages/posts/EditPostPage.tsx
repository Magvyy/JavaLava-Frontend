import { EditPost } from "@/features/posts";
import { usePost } from "./hooks/usePost";
import { useParams } from "react-router-dom";
import { useState } from "react";
import type { PostResponse } from "@/types/ApiResponses";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { editPostAPI } from "@/features/posts/services/editPostAPI";
import { PostContentEditor } from "@/features/posts/components/edit/PostContentEditor";
import { PostFooterEditor } from "@/features/posts/components/edit/PostFooterEditor";



export function EditPostPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        window.location.href = "/";
    }
    const { post, setPost } = usePost(Number(id));
    const [content, setContent] = useState<string>(post.content)
    const [visible, setVisible] = useState<boolean>(post.visible);
      
    function createPostRequest() {
        return {
            id: post.id,
            content: content,
            published: post.published,
            visible: visible
        };
    }
        
    const editPost = async () => {
        let postRequest = createPostRequest();
        await editPostAPI(postRequest, onEdit, null);
    }

    const onEdit = (post: PostResponse) => {
        setPost(post);
    }

    const onDelete = (id: number) => {
        window.location.href = "/";
    }

    return (
        <EditPost
            headerChild={
                <PostHeader
                    post_id={post.id}
                    onDelete={onDelete}
                    user={post.user}
                />
            }
            contentChild={
                <PostContentEditor
                    content={content}
                    setContent={setContent}
                    submitCallback={editPost}
                />
            }
            footerChild={
                <PostFooterEditor
                    visible={visible}
                    setVisible={setVisible}
                    submitCallback={editPost}
                />
            }
        />
    )
}