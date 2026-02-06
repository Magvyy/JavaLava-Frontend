

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isOwner } from "../hooks/isOwner";

import "./css/header-actions.css";

import dots from "./assets/dots.svg";

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
            <DropdownMenuTrigger asChild className="header-actions">
                <Button variant="outline"><img src={dots}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={(event) => {
                        event.stopPropagation();
                        editCallback();
                    }}>edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={(event) => {
                        event.stopPropagation();
                        deleteCallback()
                    }}>delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}