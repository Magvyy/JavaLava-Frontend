import env from "@/env/environment.json";

export async function acceptFriendRequest(userId: number) {
    const response = await fetch(env.backend + "/friends/requests/" + userId + "/accept", {
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