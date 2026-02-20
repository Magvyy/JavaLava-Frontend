import { useApiCall } from "@/shared/hooks/useApiCall";
import { displayError } from "@/shared/services/displayError";
import { useState } from "react";


export const useAuthenticate = (endpoint: string) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { state, handleApiCall } = useApiCall<string>()

    const authenticate = () => {
        handleApiCall({
            credentials: true,
            endpoint: endpoint,
            method: "POST",
            body: JSON.stringify({
                "user_name": username,
                "password": password
            }),
        });
    }

    if (state.called && !state.loading) {
        let error = state.result?.error;
        if (error) {
            displayError(error);
        } else {
            window.location.href = "/";
        }
    }
    
    return { setUsername, setPassword, authenticate, state }
}