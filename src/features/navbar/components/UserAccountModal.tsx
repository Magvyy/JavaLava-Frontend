import type { UserResponse } from "@/types/ApiResponses";


import { User } from "@/features/users";
interface UserAccountModalProps {
    user: UserResponse
}
export function UserAccountModal({ user }: UserAccountModalProps) {
    
    return (
        <div className="absolute w-[100px] h-[50px] -bottom-[25px] right-[46px]">
            <User
                user={user}
                className="flex flex-row items-center gap-[5px] w-[100px] h-[50px] border-[1px] rounded-[10px] p-[5px]"
            />
        </div>
    )
}