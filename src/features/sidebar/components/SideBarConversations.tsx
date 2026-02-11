import { useConversations } from "../hooks/useConversations";
import { SideBarConversation } from "./SideBarConversation";
import { Loader } from "@/shared/components/Loader";

interface SideBarConversationsProps {

}

export function SideBarConversations({  }: SideBarConversationsProps) {
    const { state } = useConversations();

    return (
        <Loader state={state} className="w-full p-4">
            {(conversations) => 
                <div className="flex flex-col gap-[10px] w-full">
                    {conversations.map(conversation => (
                        <SideBarConversation
                            key={conversation.id}
                            message={conversation}
                        />
                    ))}
                </div>
            }
        </Loader>
    )
}