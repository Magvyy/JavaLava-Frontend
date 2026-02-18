import { Button } from "@/components/ui/button";
import { acceptFriendRequest } from "@/features/users/services/acceptFriendRequest";
import { createFriendRequest } from "@/features/users/services/createFriendRequest";
import { declineFriendRequest } from "@/features/users/services/declineFriendRequest";
import { removeFriend } from "@/features/users/services/removeFriend";
import { useState } from "react";
import type { ProfileUserResponse } from "@/shared/types/UserApi";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
    profileUser: ProfileUserResponse;
    isSelf: boolean;
    onFriendStatusChange: (status: ProfileUserResponse["friend_status"]) => void;
    onVisibilityChange: () => void; // reset + refetch posts
};

export function FriendActions({ profileUser, isSelf, onFriendStatusChange, onVisibilityChange }: Props) {
    const [loading, setLoading] = useState(false);
    const { authUser, authState } = useAuth();
    if (!authUser) {
        return (
            <div className="flex justify-center">
                <Button className="self-end" onClick={() => window.location.href = "/login"} disabled={loading}>
                    Login
                </Button>
            </div>
        )
    }

    if (isSelf) return null;

    const accept = async () => {
        setLoading(true);
        if (await acceptFriendRequest(profileUser.id)) {
            onFriendStatusChange("FRIENDS");
            onVisibilityChange();
        }
        setLoading(false);
    };

    const decline = async () => {
        setLoading(true);
        if (await declineFriendRequest(profileUser.id)) {
            onFriendStatusChange("NOT_FRIENDS");
        }
        setLoading(false);
    };

    const add = async () => {
        setLoading(true);
        if (await createFriendRequest(profileUser.id)) {
            onFriendStatusChange("PENDING");
        }
        setLoading(false);
    };

    const remove = async () => {
        if (!confirm(`Remove ${profileUser.user_name} from your friends?`)) return;

        setLoading(true);
        if (await removeFriend(profileUser.id)) {
            onFriendStatusChange("NOT_FRIENDS");
            onVisibilityChange();
        }
        setLoading(false);
    };

    switch (profileUser.friend_status) {
        case "REQUESTED":
            return (
                <div className="flex justify-center gap-[10px]">
                    <Button onClick={accept} disabled={loading}>Accept</Button>
                    <Button variant="outline" onClick={decline} disabled={loading}>
                        Decline
                    </Button>
                </div>
            );

        case "FRIENDS":
            return (
                <div className="flex justify-center gap-[10px]">
                    <Button variant="outline" className="self-end" onClick={remove} disabled={loading}>
                        Remove friend
                    </Button>
                    <Button variant="outline" className="self-end" onClick={() => window.location.href = "/conversation/" + profileUser.id} disabled={loading}>
                        Message
                    </Button>
                </div>
            );

        case "PENDING":
            return  (
                <div className="flex justify-center">
                    <Button className="self-end" disabled>Request sent</Button>
                </div>
            )

        default:
            return (
                <div className="flex justify-center">
                    <Button className="self-end" onClick={add} disabled={loading}>
                        Add Friend
                    </Button>
                </div>
            );
    }
}
