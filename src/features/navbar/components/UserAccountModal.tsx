import type { UserResponse } from "@/types/ApiResponses";


import { ProfilePic, User } from "@/features/users";
interface UserAccountModalProps {
    user: UserResponse
}
export function UserAccountModal({ user }: UserAccountModalProps) {
    
    return (
        <div className="absolute bg-white w-[100px] h-[50px] -bottom-[43px] right-[46px] z-1">
            <User
                user={user}
				onClick={() => window.location.href = "/user/" + user.id}
                profilePicChild={
                    <ProfilePic/>
                }
                className="flex flex-row items-center gap-[5px] w-[100px] h-[50px] border-[1px] rounded-[10px] p-[5px]"
            />
        </div>
    )
}