import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";


interface EditPostProps {
  onError?: ((message: string) => void)
  className?: string
  children: ReactNode
}
export function EditPost({ onError, className, children}: EditPostProps) {

  return (
    <Card className={className ? className : "w-full max-w-sm p-0"}>
      {children}
    </Card>
  )
}