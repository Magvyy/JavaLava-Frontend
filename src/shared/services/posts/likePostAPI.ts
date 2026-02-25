import env from "@/env/environment.json";

export async function likePostAPI(postId: number, callback: (bool: boolean) => void) {
    let response = await fetch(env.backend + "/likes/like/post/" + postId, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    if (response.ok) {
        return callback(true);
    } else {
        return callback(false);
    }
}
