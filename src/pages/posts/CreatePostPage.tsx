import { CreatePost } from "@/features/posts";
import { useState } from "react";
import type { PostResponse } from "@/shared/types/PostApi";
import { getCurrentTime } from "@/features/comments/services/getCurrentTime";
import { PostContentCreator } from "@/features/posts/components/create/PostContentCreator";
import { PostFooterCreator } from "@/features/posts/components/create/PostFooterCreator";
import { createPostAPI } from "@/features/posts/services/createPostAPI";
import { createPost } from "./services/createPost";



export function CreatePostPage() {
    const [content, setContent] = useState<string>("")
    const [visible, setVisible] = useState<boolean>(false);

    const onCreate = (post: PostResponse) => {
        window.location.href = "/posts/" + post.id;
    }

    return (
        <div className="center-sidebar w-1/2 p-5">
            <CreatePost
                contentChild={
                    <PostContentCreator
                        content={content}
                        setContent={setContent}
                        submitCallback={() => createPost(content, visible, onCreate)}
                    />
                }
                footerChild={
                    <PostFooterCreator
                        visible={visible}
                        setVisible={setVisible}
                        submitCallback={() => createPost(content, visible, onCreate)}
                    />
                }
            />
        </div>
    )
}