import { useAuth } from "@/contexts/AuthContext";
import { useConversations } from "../hooks/useConversations";
import { SideBarConversation } from "./SideBarConversation";
import { Loader } from "@/shared/components/Loader";

interface SideBarConversationsProps {

}

export function SideBarConversations({  }: SideBarConversationsProps) {
    const { authUser, authState } = useAuth();
    const { state, conversations } = useConversations();

    return (
        <Loader state={state} data={conversations} className="w-full p-4">
            {(conversations) => 
                <div className="flex flex-col gap-[10px] w-full">
                    {conversations.map(conversation => 
                        <SideBarConversation
                            key={(authUser && authUser.id == conversation.from.id) ? conversation.to.id : conversation.from.id}
                            message={conversation}
                        />
                    )
                    }
                </div>
            }
        </Loader>
    )
}