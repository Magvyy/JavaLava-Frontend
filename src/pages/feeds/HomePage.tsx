import { useHomePagePosts } from "./hooks/useHomePagePosts";
import { useScrollToEnd } from "./hooks/useScrollToEnd";
import { ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import { deletePostAPI } from "@/features/posts/services/deletePostAPI";
import { createPostAPI } from "@/features/posts/services/createPostAPI";
import { editPostAPI } from "@/features/posts/services/editPostAPI";
import type { PostRequest, PostResponse } from "@/shared/types/PostApi";
import { Loader } from "@/shared/components/Loader";


export function HomePage() {
    const { posts, setPosts, page, setPage, state } = useHomePagePosts("all");
  
    useScrollToEnd(() => {
        if (!state.loading) setPage(page + 1);
    });

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
        <Loader state={state} className="w-full h-[200px] p-4">
            {(posts) => 
                <div className="w-full p-5 flex flex-col justify-center items-center gap-[20px] min-w-[200px] center-sidebar">
                    {posts.map(post => (
                        <ReadPost key={post.id} post={post} onClick={onClickPost}>
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
                </div>
            }
        </Loader>
    )
}