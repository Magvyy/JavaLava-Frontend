import type { UserResponse } from "@/types/ApiResponses";

import "./css/user-account-modal.css";

import { User } from "@/features/users";
interface UserAccountModalProps {
    user: UserResponse
}
export function UserAccountModal({ user }: UserAccountModalProps) {
    
    return (
        <div id="user-account-modal-container">
            <User
                user={user}
                idName="user-account-modal"
            />
        </div>
    )
}