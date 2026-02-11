import type { UserResponse } from "../types/UserApi";
import { useApiCall } from "./useApiCall";

export const useAuthenticateMe = () => {
    const state = useApiCall<UserResponse>({
        endpoint: "http://localhost:8080/auth/me",
        credentials: true,
        method: "GET",
    });
    return { state };
}