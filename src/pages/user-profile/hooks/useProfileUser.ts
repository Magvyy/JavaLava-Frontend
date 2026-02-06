import type { ProfileUserResponse} from "@/types/ApiResponses";
import { useEffect, useState } from "react";

export const useProfileUser = (userId: number | null) => {
    const [profileUser, setProfileUser] = useState<ProfileUserResponse | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(userId !== null);
    const [profileError, setProfileError] = useState<string | null>(userId === null ? "missing-user" : null);

    useEffect(() => {
        if (userId == null) return;

        queueMicrotask(() => {
            setProfileLoading(true);
            setProfileError(null);
        });

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await fetch(`http://localhost:8080/users/profile/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    signal
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setProfileError("not-found");
                    } else {
                        setProfileError(response.status.toString());
                    }
                    setProfileUser(null);
                    setProfileLoading(false);
                    return;
                }

                const userJSON = await response.json();
                setProfileUser(userJSON);
                setProfileLoading(false);
            } catch (err) {
                if (signal.aborted) return;
                setProfileLoading(false);
                if (err instanceof Error) {
                    setProfileError(err.message);
                } else {
                    setProfileError("unknown-error");
                }
            }
        };

        fetchUser();

        return () => controller.abort();
    }, [userId]);

    return { profileUser, profileLoading, profileError };
};