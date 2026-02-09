import { Button } from "@/components/ui/button";
import { acceptFriendRequest } from "@/features/users/services/acceptFriendRequest";
import { createFriendRequest } from "@/features/users/services/createFriendRequest";
import { declineFriendRequest } from "@/features/users/services/declineFriendRequest";
import { removeFriend } from "@/features/users/services/removeFriend";
import { useState } from "react";
import type { ProfileUserResponse } from "@/types/ApiResponses";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";

type Props = {
    profileUser: ProfileUserResponse;
    isSelf: boolean;
    onFriendStatusChange: (status: ProfileUserResponse["friend_status"]) => void;
    onVisibilityChange: () => void; // reset + refetch posts
};

export function FriendActions({
    profileUser,
    isSelf,
    onFriendStatusChange,
    onVisibilityChange,
}: Props) {
    const [loading, setLoading] = useState(false);
    const { user } = useAuthenticateMe();
    if (!user) {
        return (
            <Button className="self-end" onClick={() => window.location.href = "/login"} disabled={loading}>
                Login
            </Button>
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
                <div className="self-end">
                    <Button onClick={accept} disabled={loading}>Accept</Button>
                    <Button variant="outline" onClick={decline} disabled={loading}>
                        Decline
                    </Button>
                </div>
            );

        case "FRIENDS":
            return (
                <Button variant="outline" className="self-end" onClick={remove} disabled={loading}>
                    Remove friend
                </Button>
            );

        case "PENDING":
            return <Button className="self-end" disabled>Request sent</Button>;

        default:
            return (
                <Button className="self-end" onClick={add} disabled={loading}>
                    Add Friend
                </Button>
            );
    }
}
