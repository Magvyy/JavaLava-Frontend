import { useEffect } from "react";


export const useScrollToEnd = (onEnd: () => void, offset = 0) => {
    useEffect(() => {
        const handleScroll = () => {
            const viewportBottom = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (viewportBottom >= documentHeight - offset) {
                onEnd();
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [onEnd, offset]);
}