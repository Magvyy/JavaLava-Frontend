import { useEffect, useState } from "react";
import { useHomePagePosts } from "./hooks/useHomePagePosts";
import { useScrollToEnd } from "./hooks/useScrollToEnd";
import type { PostRequest, PostResponse } from "@/types/ApiResponses";
import { ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import { deletePostAPI } from "@/features/posts/services/deletePostAPI";
import { createPostAPI } from "@/features/posts/services/createPostAPI";
import { editPostAPI } from "@/features/posts/services/editPostAPI";


export function HomePage() {
    const [update, setUpdate] = useState<boolean>(true);
    const { posts, setPosts, state } = useHomePagePosts(update, "all");
  
    useScrollToEnd(() => {
        if (update) setUpdate(false)
        else setUpdate(true);
    });

    useEffect(() => {

    }, [posts, state]);

    if ( state.loading ) {
        return (
            <p>Loading...</p>
        )
    }
 
    const createPost = async (post: PostRequest) => {
        await createPostAPI(post, onCreate, null);
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

    return (
        <div className="flex flex-col items-center gap-[20px] w-2/5">
            {posts.map(post => (
                <ReadPost
                    key={post.id}
                    post={post}
                    onClick={onClickPost}
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
                        />
                    }
                />
            ))}
        </div>
    )
}