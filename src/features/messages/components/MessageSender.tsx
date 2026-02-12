import type { MessageResponse } from "@/shared/types/MessageApi";
import { useSendMessage } from "../hooks/useSendMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import send from "./assets/send.svg";

interface MessageBarProps {
    user_id: number
    addMessage: (message: MessageResponse) => void
    className?: string
}

export function MessageSender({ user_id, addMessage, className }: MessageBarProps) {
    const { content, setContent, sendMessage } = useSendMessage();
    
    return (
        <div className={className ? className : "w-full"}>
            <form 
                className="flex gap-[5px]"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(user_id, addMessage);
                }}>
                <Input
                    placeholder="Write something..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Button className="p-2" variant="outline" type="submit"><img className="w-[20px]" src={send}/></Button>
            </form>
        </div>
    )
}