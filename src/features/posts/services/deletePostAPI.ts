

export async function deletePostAPI(id: number, onDelete: ((id: number) => void), onError: ((message: string) => void) | null) {
    const response = await
        fetch("http://localhost:8080/post/" + id, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    if (response.ok) {
        onDelete(id);
    } else {
        if (onError != null) {
            onError(response.status.toString());
        }
    }
}