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
    <Card className={className ? className : "mx-auto w-full max-w-sm p-0"}>
      {contentChild}
      {footerChild}
    </Card>
  )
}