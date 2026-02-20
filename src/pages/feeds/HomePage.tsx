import { useScrollToEnd } from "../../shared/hooks/useScrollToEnd";
import { CreatePost, ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import type { PostResponse } from "@/shared/types/PostApi";
import { Loader } from "@/shared/components/Loader";
import { useRef, useState } from "react";
import { PostContentCreator } from "@/features/posts/components/create/PostContentCreator";
import { PostFooterCreator } from "@/features/posts/components/create/PostFooterCreator";
import { useAuth } from "@/contexts/AuthContext";
import { createPost } from "./services/createPost";

export function HomePage() {
    const { authUser, authState } = useAuth();

    const containerRef = useRef<HTMLDivElement>(null);
    const { data: posts, setData: setPosts, state } = useScrollToEnd<PostResponse>(
        "/posts/all",
        containerRef
    );

    const onCreate = (post: PostResponse) => {
        setPosts([post, ...posts]);
        setContent("");
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
        window.location.href = "/posts/" + post.id;
    }

    const [content, setContent] = useState<string>("")
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Loader state={state} data={posts} className="w-2/5 p-0 min-w-[350px]">
            {(posts, spinner) => 
                <div
                    className="w-fit h-full p-5 flex flex-col items-center gap-[20px] min-w-[200px] center-sidebar overflow-auto scrollbar-hide"
                    ref={containerRef}
                >
                    {authUser && <CreatePost
                        className="w-full p-0 min-w-[350px]"
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
                    />}
                        {posts.map(post => (
                            <ReadPost
                                key={post.id}
                                post={post}
                                onClick={onClickPost}
                                className="w-full p-0 min-w-[350px]"
                            >
                                <PostHeader
                                    postId={post.id}
                                    onDelete={onDelete}
                                    user={post.user}
                                />
                                <PostContentReader
                                    post={post}
                                />
                                <PostFooterReader
                                    postId={post.id}
                                    liked={post.liked}
                                    likeCount={post.like_count}
                                    commentCount={post.comment_count}
                                />
                            </ReadPost>
                        ))}
                    {spinner}
                </div>
            }
        </Loader>
    )
}