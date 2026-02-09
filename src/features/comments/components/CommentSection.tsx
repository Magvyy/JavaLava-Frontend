import type { ReactNode } from "react";


interface CommentSectionProps {
    adderChild: ReactNode
    commentsChild: ReactNode
}

export default function CommentSection({ adderChild, commentsChild }: CommentSectionProps) {
    
    return (
      <div className="flex flex-col items-center w-8/10 gap-[10px] p-[10px] no-scrollbars">
        {adderChild}
        {commentsChild}
      </div>
    )
}