import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import "./css/navbar.css";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import { NavBarUserAccount } from "./NavBarUserAccount";

interface NavBarProps {
    
}
export function NavBar() {
    const { user, state } = useAuthenticateMe();

    if (state.loading) {
        return (
            <NavigationMenu id="navbar">
                Loading...
            </NavigationMenu>
        )
    }

    return (
        <NavigationMenu>
            <NavigationMenuList className="justify-between w-screen px-9">
                <NavigationMenuItem>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>
                {(user) ? (
                    <NavBarUserAccount
                        user={user}
                    />
                ) : (
                    <div className="flex flex-1 justify-end">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/register">Register</NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    )
}