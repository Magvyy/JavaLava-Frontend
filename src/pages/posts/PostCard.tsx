

import { useParams } from 'react-router-dom';

import { WritePost } from '@/parts/posts/post'
import type { PostResponse } from '@/types/ApiResponses'
import { usePostData } from "./PostData";

export default function PostCard() {
    const { mode, id } = useParams();
    let { post, setPost, state, setState } = usePostData(id as unknown as number);

    const onPostCardError = (message: string) => {
        setState({loading: false, error: message});
    }

    if (mode == "create") {
        return (
            <WritePost
                post={post}
                callback={(post: PostResponse) => {}}
                onError={onPostCardError}
            />
        )
    }

    if (mode == "edit") {
        return (
            <WritePost
                post={post}
                callback={(post: PostResponse) => {}}
                onError={onPostCardError}
            />
        )
    }

    if (mode == "view") {
        return (
            <WritePost
                post={post}
                callback={(post: PostResponse) => {}}
                onError={onPostCardError}
            />
        )
    }
}