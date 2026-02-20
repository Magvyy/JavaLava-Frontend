import { useApiCall } from "@/shared/hooks/useApiCall";
import type { PostResponse } from "@/shared/types/PostApi";
import { useState } from "react";

export const useReadPost = (id: number) => {
    const [submit, setSubmit] = useState<boolean>(false);
    const { state, handleApiCall } = useApiCall<PostResponse>();
    if (!submit) {
        handleApiCall({
            endpoint: "/posts/" + id,
            credentials: true,
            method: "GET",
        });
        setSubmit(true);
    }

    return { state };
}