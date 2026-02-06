import type { UserResponse } from "@/types/ApiResponses";

import "./css/navbar-user-account.css";

import { useState } from "react";
import { UserAccountModal } from "./UserAccountModal";
import { UserAccount } from "./UserAccount";
import { NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
interface NavBarUserAccountProps {
    user: UserResponse
}
export function NavBarUserAccount({ user }: NavBarUserAccountProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    
    
    return (
        <NavigationMenuItem>
            <div
                id="navbar-user-account"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <NavigationMenuLink id="user-account-link" href={"/user/" + user.id}>
                    <UserAccount
                        user={user}
                    />
                </NavigationMenuLink>
                <div
                    style={{
                        position: "absolute",
                        bottom: "-25px",
                        height: "50px",
                        width: "10px",
                        right: "36px",
                        background: "transparent",
                    }}
                />
                {(isHovering) &&
                    <UserAccountModal
                        user={user}
                    />
                }
            </div>
        </NavigationMenuItem>
    )
}