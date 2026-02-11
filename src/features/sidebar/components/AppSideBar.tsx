import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar";
import { SideBarConversations } from "./SideBarConversations";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";

interface AppSideBarProps {

}

export function AppSideBar({  }: AppSideBarProps) {
    const { user, state } = useAuthenticateMe();
    
    const conversations = (!user)
    ? (
    <SidebarGroup>
        <SidebarGroupLabel>Messages</SidebarGroupLabel>
        <SidebarGroupContent className="p-2 text-center">
            Get some friends dawg
        </SidebarGroupContent>
    </SidebarGroup>
    ) : (
    <SidebarGroup>
        <SidebarGroupLabel>Messages</SidebarGroupLabel>
        <SidebarGroupContent>
            <SideBarConversations/>
        </SidebarGroupContent>
    </SidebarGroup>
    )

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {conversations}
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}