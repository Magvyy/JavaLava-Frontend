

export async function createFriendRequest(userId: number) {
    const response = await fetch(import.meta.env.VITE_API_URL + "/friends/requests/" + userId, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": "true"
        }
    });

    return response.ok;
}
