import { Card} from "@/components/ui/card";

import type { PostResponse } from "@/shared/types/PostApi";
import { type ReactNode } from "react";


interface ReadPostProps {
  post: PostResponse
  onError?: ((message: string) => void) | null
  onClick?: (post: PostResponse) => void
  children: ReactNode
  className?: string
}
export function ReadPost({ post, onError, onClick, children, className }: ReadPostProps) {
  return  (
      <Card className={className ? className + " p-0 min-w-[350px] gap-[5px]" : "w-2/5 p-0 min-w-[350px] gap-[5px]"} onClick={() => {onClick ? onClick(post) : {}}}>
        {children}
      </Card>
    )
}