
import type { Perms } from "@/shared/types/Id";

export async function fetchPerms(postId: number): Promise<Perms> {
    const response = await fetch(import.meta.env.VITE_API_URL + "/posts/" + postId + "/perms", {
        credentials: "include",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": "true"
        }
    })

    return await response.json();
}