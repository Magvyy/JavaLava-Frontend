export async function logout() {
    try {
        await fetch("http://localhost:8080/auth/logout", {
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