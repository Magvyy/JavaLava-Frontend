import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";


interface EditPostProps {
  onError?: ((message: string) => void)
  className?: string
  headerChild: ReactNode
  contentChild: ReactNode
  footerChild: ReactNode
}
export function EditPost({ onError, className, headerChild, contentChild, footerChild }: EditPostProps) {

  return (
    <Card className={className ? className : "mx-auto w-full max-w-sm p-0"}>
      {headerChild}
      {contentChild}
      {footerChild}
    </Card>
  )
}