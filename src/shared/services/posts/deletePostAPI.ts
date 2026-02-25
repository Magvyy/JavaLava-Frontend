import env from "@/env/environment.json";
import { displayError } from "@/shared/services/displayError";

export async function deletePostAPI(id: number) {
    const response = await
        fetch(env.backend + "/posts/" + id, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    if (response.ok) {
        return id;
    } else {
        displayError(response.status.toString());
    }
}