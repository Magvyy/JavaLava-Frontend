import { NavigationMenuLink } from '@/components/ui/navigation-menu';
// import Cookies from 'js-cookie';


export function Logout() {

    const handleLogout = () => {
        // Cookies.remove("access_token");
    };

    return (
        <NavigationMenuLink onClick={handleLogout} href="/">Logout</NavigationMenuLink>
    )
}