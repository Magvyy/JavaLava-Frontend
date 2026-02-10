import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import { NavBarUserAccount } from "./NavBarUserAccount";
import { SidebarTrigger } from "@/components/ui/sidebar";


export function NavBar() {
    const { user, state } = useAuthenticateMe();

    if (state.loading) {
        return (
            <NavigationMenu>
                Loading...
            </NavigationMenu>
        )
    }

    return (
        <NavigationMenu className="w-full max-w-full" id="navbar">
            <NavigationMenuList className="flex justify-between w-full max-w-full p-1">
                <div className="flex items-center justify-center mr-auto">
                    {/* <SidebarTrigger /> */}
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/empty">Empty</NavigationMenuLink>
                    </NavigationMenuItem>
                </div>
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