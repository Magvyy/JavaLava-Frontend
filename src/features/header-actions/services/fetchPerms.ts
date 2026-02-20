import env from "@/env/environment.json";
import type { Perms } from "@/shared/types/Id";

export async function fetchPerms(postId: number): Promise<Perms> {
    const response = await fetch(env.backend + "/posts/" + postId + "/perms", {
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