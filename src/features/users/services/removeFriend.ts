

export const removeFriend = async (userId: number): Promise<boolean> => {
    try {
        const res = await fetch(
            import.meta.env.VITE_API_URL + `/friends/${userId}`,
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