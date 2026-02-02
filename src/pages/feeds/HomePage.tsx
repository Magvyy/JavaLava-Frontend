import { useEffect, useState } from "react";
import { useHomePagePosts } from "./hooks/useHomePagePosts";
import { useScrollToEnd } from "./hooks/useScrollToEnd";
import type { PostResponse } from "@/types/ApiResponses";
import Feed from "@/features/feed/components/Feed";
import { PostModal } from "@/features/posts";


export function HomePage() {
    const [update, setUpdate] = useState<boolean>(true);
    const { posts, setPosts, state } = useHomePagePosts(update, "all");
    const [modal, setModal] = useState<boolean>(false);
    const [modalPost, setModalPost] = useState<PostResponse>({
        id: 0,
        user: {
            id: 0,
            user_name: "N/A"
        },
        content: "N/A",
        published: "N/A",
        visible: false,
        like_count: 0,
        comment_count: 0
    });
  
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
        setModal(modal ? false : true);
        setModalPost(post);
    }

    const onClickModal = () => {
        setModal(modal ? false : true);
    }

    if (modal) {
        return (
            <>
                <PostModal
                    post={modalPost}
                    onClick={onClickModal}
                    onDelete={onDelete}
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

    return (
        <Feed
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={onClickPost}
            posts={posts}
        />
    )
}