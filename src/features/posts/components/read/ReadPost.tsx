import { Card} from "@/components/ui/card";

import type { PostResponse } from "@/types/ApiResponses";
import { type ReactNode } from "react";


interface ReadPostProps {
  post: PostResponse
  onError?: ((message: string) => void) | null
  headerChild: ReactNode
  contentChild: ReactNode
  footerChild: ReactNode
  className?: string
}
export function ReadPost({ post, onError, headerChild, contentChild, footerChild, className }: ReadPostProps) {
  const onClick = (post: PostResponse) => {
      window.location.href = "/post/" + post.id;
  }

  return (
    <Card className={className ? className : "mx-auto w-full max-w-sm p-0"} onClick={() => (onClick ? onClick(post) : {})}>
      {headerChild}
      {contentChild}
      {footerChild}
    </Card>
  )
}