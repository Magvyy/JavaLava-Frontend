import { type ReactNode, type RefObject } from "react";
import { Card } from "@/components/ui/card";


interface CreatePostProps {
  onError?: ((message: string) => void)
  contentChild: ReactNode
  footerChild: ReactNode
  className?: string
  ref?: RefObject<HTMLDivElement | null>
}
export function CreatePost({ onError, contentChild, footerChild, className, ref }: CreatePostProps) {

  return (
    <Card className={className ? className : "w-2/5 p-0 min-w-[350px]"} ref={ref}>
      {contentChild}
      {footerChild}
    </Card>
  )
}