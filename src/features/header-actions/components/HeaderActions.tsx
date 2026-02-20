

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
import { fetchPerms } from "../services/fetchPerms";
import { useEffect, useState } from "react";
import type { Perms } from "@/shared/types/Id";

interface HeaderActionProps {
    postId: number
    editPostRedirect: () => void
    deletePost: () => void
}
export default function HeaderActions({ postId, editPostRedirect, deletePost }: HeaderActionProps) {
    const { authUser, authState } = useAuth();
    if (!authState.result?.data) return;
    const [perms, setPerms] = useState<Perms | undefined>(undefined);

    useEffect(() => {
        const getPerms = async () => {
            setPerms(await fetchPerms(postId));
        }
        getPerms();
    }, [])

    if (!perms) return;
    if (!perms.write && !perms.delete) return;

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
                    {perms.write &&
                        <DropdownMenuItem onClick={(event) => {
                            event.stopPropagation();
                            editPostRedirect();
                        }}>
                            edit
                        </DropdownMenuItem>
                    }
                    {perms.delete &&
                        <DropdownMenuItem onClick={(event) => {
                            event.stopPropagation();
                            deletePost()
                        }}>
                            delete
                        </DropdownMenuItem>
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}