import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavBarUserAccount } from "./NavBarUserAccount";
import { Logout } from "@/features/auth/components/Logout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { SearchBar } from "@/features/searchbar";


export function NavBar() {
    const { authUser, authState } = useAuth();

    return (
        <NavigationMenu className="w-full max-w-full h-[68px] border-b flex-0" id="navbar">
            <NavigationMenuList className="flex justify-between w-full max-w-full p-4">
                <div className="flex items-center justify-center mr-auto">
                    <NavigationMenuItem>
                        <SidebarTrigger />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href={authUser ? "/friends" : "/login"}>friends</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="self-start flex flex-row mx-2">
                        <SearchBar/>
                    </NavigationMenuItem>
                </div>
                <div className="flex flex-1 justify-end">
                {(authUser) ? (
                    <>
                        <NavigationMenuItem className="right-[46px]">
                            <Logout/>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavBarUserAccount
                                user={authUser}
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