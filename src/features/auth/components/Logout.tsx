import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { logout } from '../services/logout';


export function Logout() {
    
    return (
        <NavigationMenuLink onClick={logout}>Logout</NavigationMenuLink>
    )
}