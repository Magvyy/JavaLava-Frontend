

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isOwner } from "../hooks/isOwner";


import dots from "./assets/dots.svg";

interface HeaderActionProps {
    userId: number
    editPostRedirect: () => void
    deletePost: () => void
}
export default function HeaderActions({ userId, editPostRedirect, deletePost }: HeaderActionProps) {
    const owner = isOwner(userId);

    if (!owner) {
        return (<></>)
    }

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