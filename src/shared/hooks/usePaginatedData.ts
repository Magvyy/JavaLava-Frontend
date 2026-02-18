import { useApiCall } from "@/shared/hooks/useApiCall";
import { useEffect, useRef, useState } from "react";
import type { Id } from "../types/Id";


export const usePaginatedData = <T extends Id> (endpoint: string, reversed?: boolean, query?: string) => {
    const [empty, setEmpty] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<T[]>([]);
    const { state, handleApiCall } = useApiCall<T[]>();

    const added = useRef(false);

    useEffect(() => {
        if (query && query === "") return;
        handleApiCall({
            endpoint: endpoint + "?page=" + page + (query ? "&q=" + query : ""),
            credentials: true,
            method: "GET",
        });
        added.current = false;
    }, [page, query])
    
    useEffect(() => {
        const addData = state.result?.data;
        if (!addData) return;
        if (addData.length === 0) {
            setEmpty(true);
            return;
        }

        setData(prev => {
            const existingIds = new Set(prev.map(d => d.id));
            const newItems = addData.filter(item => !existingIds.has(item.id));
            
            const newIds = new Set(addData.map(d => d.id));
            const updatedItems = prev.map(item => {
                if (newIds.has(item.id)) {
                    return addData.find(i => i.id === item.id);
                } else {
                    return item;
                }
            })

            if (reversed) {
                return [...newItems, ...updatedItems as T[]];
            }
            added.current = true;
            return [...updatedItems as T[], ...newItems];
        })
    }, [state.result?.data])

    return { data, setData, page, setPage, state, empty, setEmpty, added };
}