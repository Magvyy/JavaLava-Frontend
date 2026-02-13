import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";


interface CreatePostProps {
  onError?: ((message: string) => void)
  contentChild: ReactNode
  footerChild: ReactNode
  className?: string
}
export function CreatePost({ onError, contentChild, footerChild, className }: CreatePostProps) {

  return (
    <Card className={className ? className : "w-2/5 p-0 min-w-[200px]"}>
      {contentChild}
      {footerChild}
    </Card>
  )
}