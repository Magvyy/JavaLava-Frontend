import type { PostResponse } from "@/types/ApiResponses";
import { CardContent } from "@/components/ui/card";

interface PostContentReaderProps {
    post: PostResponse,
    className?: string
}
export function PostContentReader({ post, className }: PostContentReaderProps) {
    
    return (
        <CardContent className={className ? className : "w-full p-[10px] pl-[20px] flex flex-col items-start"}>
            <p>{post.content}</p>
        </CardContent>
    )
}