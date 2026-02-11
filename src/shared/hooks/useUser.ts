import { useState } from "react";
import type { UserResponse } from "../types/UserApi";
import { useApiCall } from "./useApiCall";

export const useUser = (id: Number) => {
    const [submit, setSubmit] = useState<boolean>(false);
    const { state, handleApiCall } = useApiCall<UserResponse>();
    if (!submit) {
        handleApiCall({
            endpoint: "http://localhost:8080/users/" + id,
            credentials: true,
            method: "GET",
        });
        setSubmit(true);
    }
    return { user: state.result?.data, state };
}