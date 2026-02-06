
export async function unlikePostAPI(post_id: number, callback: (bool: boolean) => void) {
    let token = localStorage.getItem("jwt");
    let response = await fetch("http://localhost:8080/likes/unlike/post/" + post_id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    if (response.ok) {
        return callback(true);
    } else {
        return callback(false);
    }
}
