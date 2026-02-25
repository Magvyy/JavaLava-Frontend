import type { ProfileUserResponse } from "@/shared/types/UserApi";
import { useEffect, useState } from "react";

import { useApiCall } from "@/shared/hooks/useApiCall";

export const useProfileUser = (userId: number) => {
    const [update, setUpdate] = useState<boolean>(false);
    const { state, handleApiCall } = useApiCall<ProfileUserResponse>();
    useEffect(() => {
        handleApiCall({
            endpoint: `/users/profile/${userId}`,
            credentials: true,
            method: "GET",
        });
    }, [update])

    const refetch = () => {
        setUpdate(update ? false : true);
    }
    return { user: state.result?.data, state, refetch };
};