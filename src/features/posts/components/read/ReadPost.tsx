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
      <Card className={className ? className : "w-2/5 min-w-fit p-0 min-w-[200px]"} onClick={() => {onClick ? onClick(post) : {}}}>
        {children}
      </Card>
    )
}