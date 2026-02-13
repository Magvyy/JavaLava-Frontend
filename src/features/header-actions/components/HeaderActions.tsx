

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import dots from "./assets/dots.svg";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderActionProps {
    userId: number
    editPostRedirect: () => void
    deletePost: () => void
}
export default function HeaderActions({ userId, editPostRedirect, deletePost }: HeaderActionProps) {
    const { authUser, authState } = useAuth();

    const user = authState.result?.data;

    if (!user) return <></> 
    if (user.id != userId) return <></> 

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-fit h-fit p-[5px]">
                <Button variant="outline">
                    <img
                        src={dots}
                        className="h-[10px] w-[10px]"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={(event) => {
                        event.stopPropagation();
                        editPostRedirect();
                    }}>edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={(event) => {
                        event.stopPropagation();
                        deletePost()
                    }}>delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}