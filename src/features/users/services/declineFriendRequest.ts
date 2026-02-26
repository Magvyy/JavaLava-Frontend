

export const declineFriendRequest = async (userId: number): Promise<boolean> => {
    try {
        const res = await fetch(
            import.meta.env.VITE_API_URL + `/friends/requests/${userId}`,
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