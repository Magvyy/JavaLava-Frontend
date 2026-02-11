import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import { NavBarUserAccount } from "./NavBarUserAccount";
import { Logout } from "@/features/auth/components/Logout";


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
        <NavigationMenu className="w-full max-w-full border-b" id="navbar">
            <NavigationMenuList className="flex justify-between w-full max-w-full p-4">
                <div className="flex items-center justify-center mr-auto">
                    {/* <SidebarTrigger /> */}
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/empty">Empty</NavigationMenuLink>
                    </NavigationMenuItem>
                </div>
                <div className="flex flex-1 justify-end">
                {(user) ? (
                    <>
                        <NavigationMenuItem className="right-[46px]">
                            <Logout/>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavBarUserAccount
                                user={user}
                            />
                        </NavigationMenuItem>
                    </>
                ) : (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/register">Register</NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                )}
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}