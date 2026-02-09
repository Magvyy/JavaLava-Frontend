import type { State, UserResponse } from "@/types/ApiResponses";
import { useEffect, useState } from "react";

export const useAuthenticateMe = () => {
    const [user, setUser] = useState<UserResponse | undefined>();
    const [state, setState] = useState<State>({
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await
                    fetch("http://localhost:8080/auth/me", {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Access-Control-Allow-Credentials": "true"
                        }
                    });
                if (response.ok) {
                    const userJSON = await response.json();
                    setUser(userJSON);
                    setState({
                        loading: false,
                        error: null
                    });
                } else {
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err: any) {
                setState({ loading: false, error: err.message });
            }
        }
        fetchPosts();
    }, []);
    return { user, state };
}