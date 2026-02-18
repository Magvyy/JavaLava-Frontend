import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { usePaginatedData } from "./usePaginatedData";
import type { Id } from "../types/Id";


export const useScrollToEnd = <T extends Id> (endpoint: string, ref: RefObject<HTMLElement | null>, bottom = true, offset = 0, reversed = false, query?: string) => {
    const { data, setData, setPage, state, empty, setEmpty, added } = usePaginatedData<T>(endpoint, reversed, query);
    
    const scrollPosition = useRef(0);
    const previousHeight = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const interval = 500;

    const reset = () => {
        added.current = false;
        setEmpty(false);
        setPage(0);
    }

    const update = () => {
        if (added.current) return;
        setPage(prev => prev + 1);
        lastScrollTime.current = Date.now();
    }
    
    useEffect(() => {
        if (empty || !ref) return;
        
        const element = ref.current;
        if (!element) return;
        
        const handleScroll = () => {
            if (state.loading) return;

            if (bottom) {
                const scrollBottom = element.scrollTop + element.clientHeight;
                const scrollHeight = element.scrollHeight;
                if ((scrollBottom >= scrollHeight - (offset + 2)) && (Date.now() - lastScrollTime.current) > interval) {
                    update();
                    scrollPosition.current = element.scrollTop;
                }
            } else {
                const scrollTop = element.scrollTop;
                if (scrollTop <= (offset + 2) && (Date.now() - lastScrollTime.current) > interval) {
                    update();
                    previousHeight.current = element.scrollHeight;
                }
            }
        }
        element.addEventListener("scroll", handleScroll, { passive: true });
        return () => element.removeEventListener("scroll", handleScroll);
    }, [ref.current, offset, state, empty]);
    
    useEffect(() => {
        const element = ref.current;
        if (!element || state.loading) return;

        const outerHeight = element.clientHeight;
        const innerHeight = element.scrollHeight;
        if (innerHeight <= outerHeight) {
            update();
        }
    }, [data, ref.current])
        
    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (bottom) {
            element.scrollTop = scrollPosition.current;
        } else {
            element.scrollTop = element.scrollHeight - previousHeight.current;
        }
    });

    return { data, setData, state, reset }
}