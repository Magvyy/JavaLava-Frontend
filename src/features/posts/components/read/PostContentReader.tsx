import type { PostResponse } from "@/types/ApiResponses";
import { CardContent } from "@/components/ui/card";

import "./css/post-content-reader.css";

interface PostContentReaderProps {
    post: PostResponse,
}
export function PostContentReader({ post }: PostContentReaderProps) {
    
    return (
        <CardContent className="post-content">
            <p>{post.content}</p>
        </CardContent>
    )
}