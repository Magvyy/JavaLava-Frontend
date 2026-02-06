export async function acceptFriendRequest(userId: number) {
    const response = await fetch("http://localhost:8080/friends/requests/" + userId + "/accept", {
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