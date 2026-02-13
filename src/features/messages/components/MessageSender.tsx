import type { MessageResponse } from "@/shared/types/MessageApi";
import { useSendMessage } from "../hooks/useSendMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import send from "./assets/send.svg";
import { useQueryClient } from "@tanstack/react-query";

interface MessageBarProps {
    user_id: number
    addMessage: (message: MessageResponse) => void
    className?: string
}

export function MessageSender({ user_id, addMessage, className }: MessageBarProps) {
    const { content, setContent, sendMessage } = useSendMessage();

    
    // const queryClient = useQueryClient();
    // const mutation = useMutation({
    //     mutationFn: sendMessage,
    //     onSuccess: () => {
    //         // Refetch sidebar conversations
    //         queryClient.invalidateQueries({ queryKey: ["conversations"] });
    //     },
    // });
    
    return (
        <div className={className ? className : "w-full"}>
            <form 
                className="flex gap-[5px]"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(user_id, addMessage);
                }}>
                <Input
                    placeholder="Message..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Button className="p-2" variant="outline" type="submit"><img className="w-[20px]" src={send}/></Button>
            </form>
        </div>
    )
}