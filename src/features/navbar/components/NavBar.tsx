import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import "./css/navbar.css";

interface NavBarProps {
    
}
export function NavBar() {
	const localId = localStorage.getItem("user_id");

    return (
        <NavigationMenu id="navbar">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink><a href="/">Home</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink><a href={"/user/" + localId}>Profile</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink><a href="/login">Login</a></NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink><a href="/register">Register</a></NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}