export async function createFriendRequest(userId: number) {
    const token = localStorage.getItem("jwt");
    const response = await fetch("http://localhost:8080/friends/requests/" + userId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response.ok;
}
