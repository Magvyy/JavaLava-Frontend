import { useApiCall } from "@/shared/hooks/useApiCall";
import { displayError } from "@/shared/services/displayError";
import { useState } from "react";


export const useAuthenticate = (endpoint: string) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { state, handleApiCall } = useApiCall<string>()

    function isValidUsername(username: string) {
        const forbidden = /[\u200B\u200E\u200F\u202A-\u202E\u2060-\u206F]/;
        return !forbidden.test(username) && username.replace("\t", "").replace("\n", "").trim().length == 0;
    }

    const authenticate = () => {
        if (!isValidUsername(username)) {
            displayError("Don't try to register with an invisible name or you'll get banned!!!");
            return;
        }
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