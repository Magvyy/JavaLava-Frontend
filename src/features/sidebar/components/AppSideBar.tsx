import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

interface AppSideBarProps {

}

export function AppSideBar({  }: AppSideBarProps) {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}