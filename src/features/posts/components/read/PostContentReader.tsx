import type { PostResponse } from "@/shared/types/PostApi";
import { CardContent } from "@/components/ui/card";


interface PostContentReaderProps {
    post: PostResponse,
    className?: string
}
export function PostContentReader({ post, className }: PostContentReaderProps) {
    
    return (
        <CardContent className={className ? className : "w-full p-[10px] pl-[10px] flex flex-col items-start"}>
            <p className="ml-[10px]">{post.content}</p>
            {post.attachment && (
                    <img
                        className="max-w-[300px] max-h-[300px] self-center"
                        src={import.meta.env.VITE_API_URL + post.attachment.url}
                    />
                )
            }
        </CardContent>
    )
}