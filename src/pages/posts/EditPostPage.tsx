import { EditPost } from "@/features/posts";
import { useReadPost } from "./hooks/useReadPost";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PostResponse } from "@/shared/types/PostApi";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { editPostAPI } from "@/features/posts/services/editPostAPI";
import { PostContentEditor } from "@/features/posts/components/edit/PostContentEditor";
import { PostFooterEditor } from "@/features/posts/components/edit/PostFooterEditor";
import { Loader } from "@/shared/components/Loader";


export function EditPostPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        window.location.href = "/";
    }

    const { state } = useReadPost(Number(id));
    const [post, setPost] = useState<PostResponse>(state.result?.data ? state.result?.data : {
        id: 0,
        user: {
            id: 0,
            user_name: "N/A"
        },
        liked: false,
        content: "N/A",
        published: "N/A",
        visible: false,
        like_count: 0,
        comment_count: 0
    })
    const [content, setContent] = useState<string>(post.content)
    const [visible, setVisible] = useState<boolean>(post.visible);
    
    useEffect(() => {
        let data = state.result?.data;
        if (data) {
            setPost(data);
            setContent(data.content);
            setVisible(data.visible);
        }
    }, [state])
      
    function createPostRequest(post: PostResponse) {
        return {
            id: post.id,
            content: content,
            published: post.published,
            visible: visible
        };
    }
        
    const editPost = async () => {
        let postRequest = createPostRequest(post);
        await editPostAPI(postRequest, onEdit, null);
        window.location.href = "/post/" + post.id;
    }

    const onEdit = (post: PostResponse) => {
        setPost(post);
    }

    const onDelete = (id: number) => {
        window.location.href = "/";
    }

    return (
        <Loader state={state}>
            {(post) => 
                <div className="center-sidebar w-1/2 p-5">
                    <EditPost>
                        <PostHeader
                            post_id={post.id}
                            onDelete={onDelete}
                            user={post.user}
                        />
                        <PostContentEditor
                            content={content}
                            setContent={setContent}
                            submitCallback={editPost}
                        />
                        <PostFooterEditor
                            visible={visible}
                            setVisible={setVisible}
                            submitCallback={editPost}
                        />
                    </EditPost>
                </div>
            }
        </Loader>
    )
}