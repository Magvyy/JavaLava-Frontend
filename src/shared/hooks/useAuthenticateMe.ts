import { useState } from "react";
import type { UserResponse } from "../types/UserApi";
import { useApiCall } from "./useApiCall";

export const useAuthenticateMe = () => {
    const [submit, setSubmit] = useState<boolean>(false);
    const { state, handleApiCall } = useApiCall<UserResponse>({
        endpoint: "http://localhost:8080/auth/me",
        credentials: true,
        method: "GET",
    });
    if (!submit) {
        handleApiCall();
        setSubmit(true);
    }
    return { user: state.result?.data, state };
}