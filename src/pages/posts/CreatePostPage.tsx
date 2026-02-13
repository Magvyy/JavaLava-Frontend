import { CreatePost } from "@/features/posts";
import { useState } from "react";
import type { PostResponse } from "@/shared/types/PostApi";
import { getCurrentTime } from "@/features/comments/services/getCurrentTime";
import { PostContentCreator } from "@/features/posts/components/create/PostContentCreator";
import { PostFooterCreator } from "@/features/posts/components/create/PostFooterCreator";
import { createPostAPI } from "@/features/posts/services/createPostAPI";



export function CreatePostPage() {
    const [content, setContent] = useState<string>("")
    const [visible, setVisible] = useState<boolean>(false);
      
    function createPostRequest() {
        return {
            id: null,
            content: content,
            published: getCurrentTime(),
            visible: visible
        };
    }
        
    const createPost = async () => {
        let postRequest = createPostRequest();
        await createPostAPI(postRequest, onCreate, null);
    }

    const onCreate = (post: PostResponse) => {
        window.location.href = "/post/" + post.id;
    }

    return (
        <div className="center-sidebar w-1/2 p-5">
            <CreatePost
                contentChild={
                    <PostContentCreator
                        content={content}
                        setContent={setContent}
                        submitCallback={createPost}
                    />
                }
                footerChild={
                    <PostFooterCreator
                        visible={visible}
                        setVisible={setVisible}
                        submitCallback={createPost}
                    />
                }
            />
        </div>
    )
}