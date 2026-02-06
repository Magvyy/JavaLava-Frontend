
export async function unlikePostAPI(post_id: number, callback: (bool: boolean) => void) {
    let response = await fetch("http://localhost:8080/likes/unlike/post/" + post_id, {
            credentials: "include",
            method: "DELETE",
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
