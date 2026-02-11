import { useApiCall } from "@/shared/hooks/useApiCall";
import { useState } from "react";


export const useAuthenticate = (endpoint: string) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { state, handleApiCall } = useApiCall<string>({
        credentials: true,
        endpoint: "http://localhost:8080" + endpoint,
        method: "POST",
        body: JSON.stringify({
            "user_name": username,
            "password": password
        }),
    })

    const authenticate = () => {
        handleApiCall();
    }

    if (state.called) {
        let error = state.result?.error;
        if (error) {
            let errorBox = document.getElementById("error-box");
            if (errorBox) {
                errorBox.innerHTML = error;
                errorBox.classList.remove("hidden");
                errorBox.classList.add("error-box");
            }

            }else {
            window.location.href = "/";
        }
    }
    
    return { setUsername, setPassword, authenticate, state }
}