import type { UserResponse } from "@/types/ApiResponses";

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
        <div
            className="relative flex"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <NavigationMenuLink
                className="absolute w-fit h-fit z-1 right-0 -bottom-[36px]"
                href={"/user/" + user.id}
            >
                <UserAccount
                    user={user}
                />
            </NavigationMenuLink>
            {(isHovering) &&
                <UserAccountModal
                    user={user}
                />
            }
            <div
                className="absolute -bottom-[43px] right-[36px] bg-transparent h-[50px] w-[10px]"
            />
        </div>
    )
}