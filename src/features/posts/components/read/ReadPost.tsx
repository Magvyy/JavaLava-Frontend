import { Card} from "@/components/ui/card";

import type { PostResponse } from "@/types/ApiResponses";
import { type ReactNode } from "react";


interface ReadPostProps {
  post: PostResponse
  onError?: ((message: string) => void) | null
  onClick?: (post: PostResponse) => void
  headerChild: ReactNode
  contentChild: ReactNode
  footerChild: ReactNode
  className?: string
}
export function ReadPost({ post, onError, onClick, headerChild, contentChild, footerChild, className }: ReadPostProps) {

  return (
    <Card className={className ? className : "w-full min-w-sm p-0"} onClick={() => (onClick ? onClick(post) : {})}>
      {headerChild}
      {contentChild}
      {footerChild}
    </Card>
  )
}