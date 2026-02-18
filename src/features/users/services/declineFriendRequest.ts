import env from "@/env/environment.json";

export const declineFriendRequest = async (userId: number): Promise<boolean> => {
    try {
        const res = await fetch(
            env.backend + `/friends/requests/${userId}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Credentials": "true"
                }
            }
        );

        return res.ok;
    } catch {
        return false;
    }
};