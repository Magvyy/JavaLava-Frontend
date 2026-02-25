import env from "@/env/environment.json";
import { displayError } from "@/shared/services/displayError";
import type { UserRequest } from "@/shared/types/UserApi";

export async function updateProfileApi(user: UserRequest, file?: File) {
    const formData = new FormData();

    console.log(user);
    
    formData.append("user", new Blob([JSON.stringify(user)], { type: "application/json" }));

    if (file) formData.append("attachment", file);

    let response = await fetch(env.backend + "/users/" + user.id, {
            credentials: "include",
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": "true"
            },
            body: formData
        });
    if (response.ok) {
        let userDTOResponse = await response.json();
        return userDTOResponse;
    } else {
        displayError(response.status.toString());
    }
}
