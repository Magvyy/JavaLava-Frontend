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
    <Card className={className ? className + " p-0 min-w-[350px] gap-[5px]" : "w-2/5 p-0 min-w-[350px] gap-[5px]"} ref={ref}>
      {contentChild}
      {footerChild}
    </Card>
  )
}