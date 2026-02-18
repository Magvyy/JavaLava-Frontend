import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";


interface EditPostProps {
  onError?: ((message: string) => void)
  className?: string
  children: ReactNode
}
export function EditPost({ onError, className, children}: EditPostProps) {

  return (
    <Card className={className ? className : "w-2/5 p-0 min-w-[350px]"}>
      {children}
    </Card>
  )
}