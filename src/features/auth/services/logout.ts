

export async function logout() {
    try {
        await fetch(import.meta.env.VITE_API_URL + "/auth/logout", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        })
        window.location.href = "/";
    } catch (e) {
        console.log(e);
    }
};