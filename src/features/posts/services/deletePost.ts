
export async function deletePost(id: number, onDelete: ((id: number) => void), onError: ((message: string) => void) | null) {
    let token = localStorage.getItem("jwt");
    const response = await
        fetch("http://localhost:8080/post/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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