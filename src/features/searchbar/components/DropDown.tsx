import { ProfilePic, User } from "@/features/users";
import type { UserResponse } from "@/types/ApiResponses";
import type { RefObject } from "react";



interface DropDownProps {
    users: UserResponse[]
    open: boolean
    ref: RefObject<HTMLDivElement | null>
}

export function DropDown({ users, open, ref }: DropDownProps) {
    if (!open) return;

    return (
        <div className="relative z-1 h-48 w-48 rounded-md border bg-white overflow-auto scrollbar-hide" ref={ref}>
            {users.length === 0 ? 
                <div className="w-full h-47 flex justify-center items-center">
                    <p className="p-4">No results...</p>
                </div>
                : users.map(user => 
                <div className="p-4">
                    <User
                        key={user.id}
                        profilePicChild={
                            <ProfilePic/>
                        }
                        user={user}
                        onClick={() => window.location.href = "/user/" + user.id}
                        className="flex gap-[10px] items-center p-0"
                    />
                </div>
            )}
        </div>
    )
}