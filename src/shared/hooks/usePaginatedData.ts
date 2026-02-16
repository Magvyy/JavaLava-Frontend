import { useApiCall } from "@/shared/hooks/useApiCall";
import { useEffect, useState } from "react";
import type { Id } from "../types/Id";


export const usePaginatedData = <T extends Id> (endpoint: string) => {
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<T[]>([]);
    const { state, handleApiCall } = useApiCall<T[]>();

    useEffect(() => {
        handleApiCall({
            endpoint: endpoint + "?page=" + page,
            credentials: true,
            method: "GET",
        });
    }, [page])
    
    useEffect(() => {
        const data = state.result?.data;
        if (!data) return;

        setData(prev => {
            const existingIds = new Set(prev.map(d => d.id));
            const newItems = data.filter(item => !existingIds.has(item.id));
            return [...prev, ...newItems];
        })
    }, [state.result?.data])

    return { data, setData, page, setPage, state };
}