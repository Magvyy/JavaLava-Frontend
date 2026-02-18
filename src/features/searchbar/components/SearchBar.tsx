import { Input } from "@/components/ui/input";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";
import type { UserResponse } from "@/types/ApiResponses";
import { useEffect, useRef, useState } from "react";
import { DropDown } from "./DropDown";


export function SearchBar() {
    const [search, setSearch] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);
    const { data: users, reset } = useScrollToEnd<UserResponse>(
        "/users/search",
        containerRef,
        true,
        0,
        false,
        search
    );

    useEffect(() => {
        reset();
    }, [search])

    return (
        <div className="absolute flex flex-col gap-[5px]">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Users"
                className="top-0 left-0 w-48"
            />
            <DropDown
                users={users}
                open={search !== ""}
                ref={containerRef}
            />
        </div>
    )
}