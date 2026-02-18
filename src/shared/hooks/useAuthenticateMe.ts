import { useState } from "react";
import type { UserResponse } from "../types/UserApi";
import { useApiCall } from "./useApiCall";

export const useAuthenticateMe = () => {
    const [submit, setSubmit] = useState<boolean>(false);
    const { state, handleApiCall } = useApiCall<UserResponse>();
    if (!submit) {
        handleApiCall({
            endpoint: "/auth/me",
            credentials: true,
            method: "GET",
        });
        setSubmit(true);
    }
    return { user: state.result?.data, state };
}