import { useScrollToEnd } from "../../shared/hooks/useScrollToEnd";
import { ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import { deletePostAPI } from "@/features/posts/services/deletePostAPI";
import { createPostAPI } from "@/features/posts/services/createPostAPI";
import { editPostAPI } from "@/features/posts/services/editPostAPI";
import type { PostRequest, PostResponse } from "@/shared/types/PostApi";
import { Loader } from "@/shared/components/Loader";
import { useRef, useState } from "react";
import { getCurrentTime } from "@/features/comments/services/getCurrentTime";

export function FriendFeed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: posts, setData: setPosts, state } = useScrollToEnd<PostResponse>(
        "/post/friends",
        containerRef
    );

    const createPost = async () => {
        let postRequest = createPostRequest();
        await createPostAPI(postRequest, onCreate, null);
    }

    const onCreate = (post: PostResponse) => {
        setPosts([post, ...posts]);
    }
    
    const editPost = async (post: PostRequest) => {
        await editPostAPI(post, onEdit, null);
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

    const deletePost = async (id: number) => {
        await deletePostAPI(id, onDelete, null);
    }

    const onDelete = (id: number) => {
        let temp = posts.filter(post => {
            if (post.id !== id) {
                return post;
            }
        })
        setPosts(temp);
    }

    const onClickPost = (post: PostResponse) => {
        window.location.href = "/post/" + post.id;
    }

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

    return (
        <Loader state={state} data={posts} className="w-2/5 p-0 min-w-[350px]">
            {(posts, spinner) => 
                <div
                    className="w-fit h-full p-5 flex flex-col items-center gap-[20px] min-w-[200px] center-sidebar overflow-auto scrollbar-hide"
                    ref={containerRef}
                >
                        {posts.map(post => (
                            <ReadPost
                                key={post.id}
                                post={post}
                                onClick={onClickPost}
                                className="w-full p-0 min-w-[350px]"
                            >
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
                                />
                            </ReadPost>
                        ))}
                    {spinner}
                </div>
            }
        </Loader>
    )
}