

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isOwner } from "../hooks/isOwner";

interface HeaderActionProps {
    userId: number,
    editCallback: () => void,
    deleteCallback: () => void
}
export default function HeaderActions({ userId, editCallback, deleteCallback }: HeaderActionProps) {
    const owner = isOwner(userId);

    if (!owner) {
        return (<></>)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => editCallback()}>edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteCallback()}>delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}