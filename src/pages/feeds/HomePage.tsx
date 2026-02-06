import { useEffect, useState } from "react";
import { useHomePagePosts } from "./hooks/useHomePagePosts";
import { useScrollToEnd } from "./hooks/useScrollToEnd";
import type { PostResponse } from "@/types/ApiResponses";
import Feed from "@/features/feed/components/Feed";
import { CreatePost } from "@/features/posts";


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

    const onCreate = (post: PostResponse) => {
        setPosts([post, ...posts]);
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

    const onDelete = (del: PostResponse | number) => {
        let temp = posts.filter(post => {
        if (typeof del === "number" && post.id !== del) {
            return post;
        } else if (post.id !== (del as PostResponse).id) {
            return post;
        }
        })
        setPosts(temp);
    }

    const onClickPost = (post: PostResponse) => {
        window.location.href = "/post/" + post.id;
    }

    return (
        <>
            <CreatePost
                onCreate={onCreate}
            />
            <Feed
                onEdit={onEdit}
                onDelete={onDelete}
                onClick={onClickPost}
                posts={posts}
            />
        </>
    )
}