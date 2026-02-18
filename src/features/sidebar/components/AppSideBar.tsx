import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar";
import { SideBarConversations } from "./SideBarConversations";
import { useAuth } from "@/contexts/AuthContext";

interface AppSideBarProps {

}

export function AppSideBar({  }: AppSideBarProps) {
    const { authUser, authState } = useAuth();

    const conversations = (!authUser)
    ? (
    <SidebarGroup>
        <SidebarGroupLabel>Messages</SidebarGroupLabel>
        <SidebarGroupContent className="p-2 text-center">
            Login to view
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