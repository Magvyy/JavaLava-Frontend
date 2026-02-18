import type { ReactNode } from "react";


interface CommentSectionProps {
    adderChild: ReactNode
    commentsChild: ReactNode
}

export default function CommentSection({ adderChild, commentsChild }: CommentSectionProps) {
    
    return (
      <div className="flex flex-col items-center w-full gap-[10px] px-10 py-2">
        {commentsChild}
        {adderChild}
      </div>
    )
}