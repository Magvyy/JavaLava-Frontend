import type { MessageResponse, State } from "@/types/ApiResponses";
import { useEffect, useState } from "react";

export const useConversations = (update: boolean) => {
    const [conversations, setConversations] = useState<MessageResponse[]>([]);
    const [state, setState] = useState<State>({
        loading: true,
        error: null
    });
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await
                    fetch("http://localhost:8080/messages", {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Access-Control-Allow-Credentials": "true"
                        }
                    });
                if (response.ok) {
                    const conversationsJSON = await response.json();
                    setConversations([...conversations, ...conversationsJSON]);
                    setState({
                        loading: false,
                        error: null
                    });
                    setPage(page + 1);
                } else {
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err: any) {
                setState({ loading: false, error: err.message });
            }
        }
        fetchPosts();
    }, [update]);
    return { conversations, setConversations, state };
}