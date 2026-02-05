import type { UserResponse } from "@/types/ApiResponses";
import { useEffect, useState } from "react";

export const useProfileUser = (userId: number | null) => {
    const [profileUser, setProfileUser] = useState<UserResponse | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);
    const [profileError, setProfileError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        if (userId == null) {
            queueMicrotask(() => {
                setProfileUser(null);
                setProfileLoading(false);
                setProfileError("missing-user");
            });
            return () => {
                ignore = true;
            };
        }

        queueMicrotask(() => {
            setProfileLoading(true);
            setProfileError(null);
        });

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await fetch("http://localhost:8080/users/" + userId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    if (!ignore) {
                        setProfileLoading(false);
                        setProfileError(response.status.toString());
                    }
                    return;
                }
                const userJSON = await response.json();
                if (!ignore) {
                    setProfileUser(userJSON);
                    setProfileLoading(false);
                }
            } catch (err) {
                if (!ignore) {
                    setProfileLoading(false);
                    if (err instanceof Error) {
                        setProfileError(err.message);
                    } else {
                        setProfileError("unknown-error");
                    }
                }
            }
        };

        fetchUser();
        return () => {
            ignore = true;
        };
    }, [userId]);

    return { profileUser, setProfileUser, profileLoading, profileError };
};
